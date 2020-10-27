<script>
  import { push } from "svelte-spa-router";
  import { host, update, formatDate } from "../main";
  export let PostID;
  export let Title;
  export let Username;
  export let AuthorID;
  export let Comments;
  export let Likes;
  export let Dislikes;
  export let Reaction;
  export let Posted;
  export let Text; // ???????
  export let Categories;
</script>

<style>
  img {
    height: 39px;
    border-radius: 50%;
    cursor: pointer;
    margin-top: 8px;
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
    margin-bottom: 8px;
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
    margin-bottom: 7px;
    font-weight: 200;
  }

  .card {
    border-bottom: 1px solid var(--border-color);
    padding: 16px;
    opacity: 1;
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
    font-size: 10px;
    padding-top: 5px;
  }
  .tags {
    margin-bottom: 16px;
  }
  .tags > span {
    opacity: 0.3;
    font-size: 12px;
    margin-right: 8px;
  }
</style>

<div class="card">
  <div class="quest">
    <img
      src="{host}/avatars/{AuthorID}.jpg?u={$update}"
      alt=""
      on:error={(AuthorID = 0)}
      on:click={push('/users/' + AuthorID)} />
    <div class="base">
      <a href="/#/posts/{PostID}" class="text">
        <div class="head">
          <span>@{Username}</span>
          <small>&ensp;&bull;&ensp;{formatDate(Posted)}</small>
        </div>
        <p>{Title}</p>
        <div class="tags">
          {#each Categories as cat}
            <span>#{cat.Name}</span>
          {/each}
        </div>
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
