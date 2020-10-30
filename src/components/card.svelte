<script>
  import { host, formatDate, update } from "../main";
  import { createEventDispatcher } from "svelte";
  const dispatcher = createEventDispatcher();
  export let uid;
  export let pid = 0;
  export let cid = 0;
  export let created = 0;
  export let text = "";
  export let username = "";
  export let categories = [];
  export let likes = 0;
  export let dislikes = 0;
  export let comments = 0;
  export let reaction = "";
  $: count = likes - dislikes;
  $: react = reaction;
</script>

<style>
  [aria-checked="true"]:hover {
    background: var(--input-color);
  }
  .card {
    grid-template-columns: 40px auto;
    border-bottom: var(--border);
    column-gap: 16px;
    display: grid;
    padding: 16px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  .head,
  .foot {
    display: flex;
    justify-content: space-between;
  }

  span,
  p {
    font-weight: 200;
    font-size: 13px;
  }

  span {
    opacity: 0.8;
  }

  p {
    line-height: 1.8;
    margin: 8px 0;
  }

  i,
  small {
    font-weight: 200;
    margin-top: 4px;
    font-size: 11px;
    opacity: 0.4;
  }

  .buttons {
    justify-content: space-between;
    align-items: center;
    display: flex;
    width: 55px;
  }

  .buttons > i {
    opacity: 1;
  }

  .like > .plus,
  .dislike > .minus,
  i:hover {
    color: var(--secondary-color);
  }
</style>

<div class="card" aria-checked={pid != 0 && true}>
  <div>
    <a href="#/users/{uid}">
      <img
        src="{host}/avatars/{uid}.jpg?u={$update}"
        alt=""
        on:error={() => (uid = 0)} />
    </a>
    <slot name="underava" />
  </div>
  <a href={pid == 0 ? null : '#/posts/' + pid}>
    <slot name="blank" />
    {#if cid != 0 || pid != 0}
      <div class="head">
        <span>@{username}</span>
        <small>{formatDate(created)}</small>
      </div>
      <p>
        {@html text}
      </p>
      <div class="foot">
        <div>
          {#if cid == 0}
            {#each categories as c}
              <small>#{c.Name}</small>
              &nbsp;
            {/each}
          {/if}
        </div>
        <div class={cid != 0 && 'buttons ' + react}>
          {#if cid == 0}
            <i class="heart" />
            <small>{likes - dislikes}</small>
            &nbsp;
            <i class="message-square" />
            <small>{comments}</small>
          {:else}
            <i
              class="plus"
              on:click={() => {
                dispatcher('plus', {
                  id: cid,
                  reaction: 'like',
                  type: 'comment'
                });
                if (react == 'like') {
                  react = 'idle';
                  count--;
                } else if (react == 'dislike') {
                  count = count + 2;
                  react = 'like';
                } else {
                  count++;
                  react = 'like';
                }
              }} />
            &nbsp;
            <small>{count}</small>
            &nbsp;
            <i
              class="minus"
              on:click={() => {
                dispatcher('minus', {
                  id: cid,
                  reaction: 'dislike',
                  type: 'comment'
                });
                if (react == 'dislike') {
                  react = 'idle';
                  count++;
                } else if (react == 'like') {
                  count = count - 2;
                  react = 'dislike';
                } else {
                  count--;
                  react = 'dislike';
                }
              }} />
          {/if}
        </div>
      </div>
    {/if}
  </a>
  <slot />
</div>
