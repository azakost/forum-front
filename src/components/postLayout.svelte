<script>
  import { createEventDispatcher } from "svelte";
  import { currentPost, host, id } from "../main";
  import Card from "../components/card.svelte";
  const dispatcher = createEventDispatcher();
  export let Title;
  export let Categories;
  export let Reaction;
  export let Text;
  export let PostID;
  export let AuthorID;
  export let Username;
  export let Likes;
  export let Dislikes;

  const categs = obj => {
    let cats = [];
    obj.forEach(e => {
      cats.push(e.ID);
    });
    return cats;
  };

  currentPost.set({
    title: Title,
    text: Text,
    user: Username,
    cats: categs(Categories)
  });

  $: react = Reaction;
  $: count = Likes - Dislikes;
</script>

<style>
  .long {
    font-size: 14px;
    font-weight: 200;
    line-height: 1.8;
  }

  .long,
  .actions {
    border-bottom: var(--border);
    padding: 16px;
  }

  small {
    line-height: 1.8;
    font-weight: 200;
    font-size: 13px;
    opacity: 0.4;
  }

  i {
    opacity: 0.8;
  }

  .actions,
  .actions > div {
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .actions > div {
    width: 80px;
  }

  .like > .thumbs-up,
  .dislike > .thumbs-down,
  i:hover {
    color: var(--secondary-color);
  }

  p {
    font-weight: 200;
    font-size: 14px;
    line-height: 1.8;
  }

  .count {
    margin: 0 8px;
  }
</style>

<Card uid={AuthorID}>
  <div slot="blank">
    <p>{Title}</p>
    <div class="cats">
      {#each Categories as cat}
        <small>#{cat.Name}</small>
        &nbsp;
      {/each}
    </div>
  </div>

</Card>

{#if Text != ''}
  <div class="long">
    {@html Text}
  </div>
{/if}
<div class="actions">
  <div>
    {#if AuthorID == $id}
      <a href="#/edit/{PostID}">
        <i class="edit" />
      </a>
    {:else}
      <i
        class="flag"
        on:click={() => {
          dispatcher('edit', { id: PostID });
        }} />
    {/if}
  </div>

  <div class={react}>
    <i
      class="thumbs-up"
      on:click={() => {
        dispatcher('like', { id: PostID });
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

    <small class="count">{count}</small>

    <i
      class="thumbs-down"
      on:click={() => {
        dispatcher('dislike', { id: PostID });
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
  </div>
</div>
