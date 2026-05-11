import "./style.css";
import { mountGameApp } from "./app";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Не найден корневой элемент #app");
}

mountGameApp(root);