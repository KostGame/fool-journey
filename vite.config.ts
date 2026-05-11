import { defineConfig } from "vite";

export default defineConfig({
  base: "/fool-journey/",
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node"
  }
});