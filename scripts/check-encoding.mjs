import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const allowedExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".md", ".html", ".css", ".yml", ".yaml", ".txt"]);
const ignoredSegments = new Set([".git", "node_modules", "dist", "coverage"]);
const suspiciousPatterns = [
  { label: "replacement character", pattern: "�" },
  { label: "double replacement sequence", pattern: "����" },
  { label: "common mojibake marker", pattern: "вЂ" },
  { label: "common mojibake marker", pattern: "Ð" },
  { label: "common mojibake marker", pattern: "Ã" }
];

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function isIgnored(filePath) {
  const parts = filePath.split(path.sep);
  return (
    filePath.endsWith(`${path.sep}scripts${path.sep}check-encoding.mjs`) ||
    parts.some((part) => ignoredSegments.has(part)) ||
    filePath.includes(`${path.sep}public${path.sep}assets${path.sep}`)
  );
}

function isTextFile(filePath) {
  return allowedExtensions.has(path.extname(filePath).toLowerCase());
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!isIgnored(fullPath)) {
        files.push(...(await walk(fullPath)));
      }
      continue;
    }

    if (entry.isFile() && isTextFile(fullPath) && !isIgnored(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = await walk(rootDir);
  const issues = [];

  for (const filePath of files) {
    const relativePath = toPosix(path.relative(rootDir, filePath));
    const content = await readFile(filePath, "utf8");

    if (relativePath === "index.html" && !/<meta\s+charset="UTF-8"\s*\/>/i.test(content)) {
      issues.push({ file: relativePath, line: 1, label: "missing UTF-8 meta charset" });
    }

    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const rule of suspiciousPatterns) {
        if (line.includes(rule.pattern)) {
          issues.push({
            file: relativePath,
            line: index + 1,
            label: rule.label
          });
        }
      }
    });
  }

  if (issues.length > 0) {
    console.error("Encoding audit failed:");
    for (const issue of issues) {
      console.error(`- ${issue.file}:${issue.line} (${issue.label})`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Encoding audit passed for ${files.length} text files.`);
}

await main();
