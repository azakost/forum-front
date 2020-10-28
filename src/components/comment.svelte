<script>
  import { host } from "../main";
  import { createEventDispatcher } from "svelte";
  const dispatcher = createEventDispatcher();

  export let Comment = "Одной из причин быстрого роста ";
  export let AuthorID = 1;
  export let CommentID = 1;
  export let Username = "username";
  export let Like = 5;
  export let Dislike = 1;
  export let Reaction = "like";
</script>

<style>
  small {
    opacity: 0.4;
  }
  i {
    opacity: 0.8;
  }

  .comment {
    grid-template-columns: 38px auto 15px;
    border-bottom: var(--border);
    display: grid;
    padding: 16px;
  }

  .left-col > img {
    border-radius: 50%;
    margin-top: 6px;
    height: 38px;
  }

  .foot {
    flex-direction: column;
    align-self: flex-start;
    align-items: center;
    display: flex;
    margin-top: 6px;
  }

  .foot > small {
    margin: 4px 0;
  }

  .right-col {
    margin: 0 16px;
  }

  .pick {
    color: var(--secondary-color);
  }
  span {
    font-weight: 600;
  }
</style>

<div class="comment">
  <div class="left-col">
    <img src="{host}/avatars/{AuthorID}.jpg" alt="" />
  </div>
  <div class="right-col">
    <span>@{Username}</span>
    <p>{Comment}</p>
  </div>

  <div class="foot">
    <i
      class="plus {Reaction == 'like' && 'pick'}"
      on:click={dispatcher('plus', { id: CommentID })} />
    <small>{Like - Dislike}</small>
    <i
      class="minus {Reaction == 'dislike' && 'pick'}"
      on:click={dispatcher('minus', { id: CommentID })} />
  </div>
</div>
