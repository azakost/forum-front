<script>
  import { host, update, formatDate } from "../main";
  export let PostID;
  export let Title;
  export let Username;
  export let AuthorID;
  export let Comments;
  export let Likes;
  export let Dislikes;
  export let Posted;
  export let Categories;
</script>

<style>
  .tweet {
    display: grid;
    grid-template-columns: 70px auto;
    border-bottom: var(--border);
  }
  .tweet:hover {
    background: var(--input-color);
  }

  /* Left column */
  .left-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }

  img {
    height: 38px;
    border-radius: 50%;
    margin: 6px 0;
  }

  i,
  small {
    margin-top: 4px;
    font-size: 11px;
    opacity: 0.4;
    font-weight: 200;
  }

  /* Right column */
  .right-col {
    padding: 16px 16px 16px 0;
    display: flex;
    flex-flow: column nowrap;
  }

  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  span {
    font-weight: 100;
    font-size: 13px;
    opacity: 0.8;
  }

  p {
    font-weight: 200;
    line-height: 1.8;
    font-size: 13px;
    margin: 8px 0;
  }

  .foot {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
</style>

<div class="tweet">

  <div class="left-col">
    <a href="#/users/{AuthorID}">
      <img
        src="{host}/avatars/{AuthorID}.jpg?u={update}"
        on:error={(AuthorID = 0)}
        alt="" />
    </a>
    <i class="activity" />
    <small>{Likes - Dislikes}</small>
  </div>

  <a class="right-col" href="#/posts/{PostID}">
    <div class="head">
      <span>@{Username}</span>
      <small>{formatDate(Posted)}</small>
    </div>
    <p>{Title}</p>
    <div class="foot">
      <div>
        {#each Categories as cat}
          <small>#{cat.Name}</small>
          &nbsp;
        {/each}
      </div>
      <div>
        <i class="message-square" />
        <small>{Comments}</small>
      </div>
    </div>
  </a>

</div>
