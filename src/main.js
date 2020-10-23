import App from "./App.svelte";
import { writable } from "svelte/store";

const inStore = (name, defval) => {
  let l = localStorage.getItem(name);
  return l == null ? defval : l;
};

export const username = writable(inStore("username", ""));
export const fullname = writable(inStore("fullname", ""));
export const id = writable(inStore("id", ""));

export const post = async (url, body) => {
  let res = await fetch("http://localhost:8080/api" + url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res;
};

const app = new App({
  target: document.body,
});
export default app;
