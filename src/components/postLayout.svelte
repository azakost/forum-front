<script>
  import { createEventDispatcher } from "svelte";
  import { currentAuthor, host } from "../main";
  const dispatcher = createEventDispatcher();
  export let Title;
  export let Categories;
  export let Reaction;
  export let Text;
  export let PostID;
  export let AuthorID;
  export let Username;
  currentAuthor.set(Username);
</script>

<style>
  .post {
    height: calc(100vh - 52px);
    -ms-overflow-style: none;
    scrollbar-width: none;
    font-weight: 200;
    line-height: 1.8;
    font-size: 13px;
    overflow: auto;
  }

  @media only screen and (max-width: 500px) {
    .post {
      height: calc(100vh - 47px - 52px);
    }
  }
  .short,
  .long,
  .actions {
    border-bottom: var(--border);
    padding: 16px;
  }

  .short {
    display: grid;
    grid-template-columns: 38px auto;
  }

  .short > div > * {
    display: block;
  }
  small {
    opacity: 0.4;
  }
  i {
    opacity: 0.8;
  }
  span {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 13px;
  }

  .actions,
  .actions > div {
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .actions > div {
    width: 50px;
  }

  .like > .thumbs-up,
  .dislike > .thumbs-down,
  i:hover {
    color: var(--secondary-color);
  }

  img {
    border-radius: 50%;
    margin-top: 6px;
    height: 38px;
  }
  .content {
    margin-left: 16px;
  }
</style>

<div class="post">
  <div class="short">
    <a href="#/users/{AuthorID}">
      <img src="{host}/avatars/{AuthorID}.jpg" alt="" />
    </a>
    <div class="content">
      <span>{Title}</span>
      <div>
        {#each Categories as cat}
          <small>#{cat.Name}</small>
          &nbsp;
        {/each}
      </div>
    </div>
  </div>
  {#if Text != ''}
    <div class="long">
      {@html Text}
    </div>
  {/if}
  <div class="actions">
    <i class="alert-triangle" on:click={dispatcher('report', { id: PostID })} />
    <div class={Reaction}>
      <i class="thumbs-up" on:click={dispatcher('like', { id: PostID })} />
      <i class="thumbs-down" on:click={dispatcher('dislike', { id: PostID })} />
    </div>
  </div>
  <slot name="write" />
  <slot name="comments" />
</div>
