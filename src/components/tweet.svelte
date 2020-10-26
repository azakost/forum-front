<script>
  import { push } from "svelte-spa-router";
  import { host } from "../main";
  export let PostID;
  export let Title;
  export let Username;
  export let AuthorID;
  export let Comments;
  export let Likes;
  export let Dislikes;
  export let Reaction;
  export let Posted;
  export let Text;
  export let Categories;

  function formatDate(secs) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    let x = new Date();
    let timezone = -x.getTimezoneOffset() / 60;
    t.setHours(t.getHours() + timezone);
    let diff = new Date() - t;
    let sec = Math.floor(diff / 1000);
    if (sec < 60) {
      return "сейчас";
    }
    let min = Math.floor(diff / 60000);
    if (min < 60) {
      return min + " мин. назад";
    }

    let d = t;
    d = [
      "0" + d.getDate(),
      "0" + (d.getMonth() + 1),
      "" + d.getFullYear(),
      "0" + d.getHours(),
      "0" + d.getMinutes()
    ].map(component => component.slice(-2));

    return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
  }
</script>

<style>
  img {
    height: 49px;
    border-radius: 50%;
    cursor: pointer;
  }

  .quest {
    display: flex;
  }

  .base {
    width: calc(100% - 49px);
    padding-left: 16px;
    min-height: 70px;
  }

  .head {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }

  .actions {
    display: flex;
    justify-content: space-around;
    position: relative;
  }

  .actions > span {
    opacity: 0.5;
  }

  .actions > span:hover {
    opacity: 1;
    color: var(--secondary-color);
  }

  .head > span {
    font-size: 15px;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 14px;
    font-weight: 200;
  }

  .card {
    border-bottom: 1px solid var(--border-color);
    padding: 16px;
  }

  .card:hover {
    background-color: var(--input-color);
  }

  .actions > span {
    width: 17.6px;
    white-space: nowrap;
    font-size: 14px;
  }

  .actions > span,
  .head > span {
    cursor: pointer;
  }

  .like,
  .dislike {
    color: var(--secondary-color);
  }

  small {
    opacity: 0.3;
  }
</style>

<div class="card">
  <div class="quest">
    <img
      src="{host}/avatars/{AuthorID}.jpg"
      alt=""
      on:error={(AuthorID = 0)}
      on:click={push('/users/' + AuthorID)} />
    <div class="base">
      <a href="/#/posts/{PostID}" class="text">
        <div class="head">
          <span>@{Username}</span>
          &ensp;&bull;&ensp;
          <small>{formatDate(Posted)}</small>
        </div>
        <p>{Title}</p>
      </a>
    </div>
  </div>
  <div class="actions">
    <span on:click={push('/posts/' + PostID)}>
      <i class="message-circle" />
      {Comments}
    </span>
    <span>
      <i class="thumbs-up {Reaction}" />
      {Likes}
    </span>
    <span>
      <i class="thumbs-down {Reaction}" />
      {Dislikes}
    </span>
    <span class="more">
      <i class="alert-circle" />
    </span>
  </div>
</div>
