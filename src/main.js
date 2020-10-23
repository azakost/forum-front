import App from "./App.svelte";
import { writable } from "svelte/store";

const inStore = (name, defval) => {
  let l = localStorage.getItem(name);
  return l == null ? defval : l;
};

export const username = writable(inStore("username", ""));
export const fullname = writable(inStore("fullname", ""));
export const id = writable(inStore("id", 0));
export const update = writable("");

const host = "http://localhost:8080/api";
export const post = async (url, body) => {
  let res = await fetch(host + url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res;
};

export const upload = async (url, name, files) => {
  const formData = new FormData();
  formData.append(name, files[0]);
  let res = await fetch(host + url, {
    "Content-Type": "multipart/form-data",
    credentials: "include",
    method: "POST",
    body: formData,
  });
  return res;
};

const app = new App({
  target: document.body,
});
export default app;
