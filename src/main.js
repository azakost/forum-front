import App from "./App.svelte";
import { writable } from "svelte/store";

export const host = "http://localhost:8080";

export const save = (name, store, value) => {
  store.set(value);
  localStorage.setItem(name, value);
};

const inStore = (name, defval) => {
  let l = localStorage.getItem(name);
  return l == null ? defval : l;
};

export const username = writable(inStore("username", ""));
export const fullname = writable(inStore("fullname", ""));
export const tmpuser = writable(inStore("tmpuser", ""));
export const id = writable(inStore("id", 0));
export const update = writable(Date.now());

export const filter = writable("");
export const sort = writable("");

export const post = async (url, body) => {
  let res = await fetch(host + "/api" + url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (res.status == 403) logout();
  return res;
};

export const get = async (url) => {
  let res = await fetch(host + "/api" + url, {
    credentials: "include",
  });
  return await res.json();
};

export const upload = async (url, name, files) => {
  let formData = new FormData();
  formData.append(name, files[0]);
  let res = await fetch(host + "/api" + url, {
    "Content-Type": "multipart/form-data",
    credentials: "include",
    method: "POST",
    body: formData,
  });
  if (res.status == 403) logout();
  return res;
};

export const cats = async () => {
  let res = await fetch(host + "/api/categories");
  return await res.json();
};

export const logout = async () => {
  localStorage.clear();
  username.set("");
  fullname.set("");
  await post("/logout");
  window.location = "/#/login";
};

export const formatDate = (secs) => {
  let t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  let x = new Date();
  let timezone = -x.getTimezoneOffset() / 60;
  t.setHours(t.getHours() + timezone);
  let diff = new Date() - t;
  let sec = Math.floor(diff / 1000);
  if (sec < 2) {
    return "сейчас";
  }

  if (sec < 60) {
    return sec + " сек. назад";
  }

  let min = Math.floor(diff / 60000);
  if (min < 60) {
    return min + " мин. назад";
  }
  let d = t;
  d = ["0" + d.getDate(), "0" + (d.getMonth() + 1), "" + d.getFullYear(), "0" + d.getHours(), "0" + d.getMinutes()].map((component) => component.slice(-2));
  return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
};

const app = new App({
  target: document.body,
});
export default app;
