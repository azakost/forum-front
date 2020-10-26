<script>
  import Head from "../components/head.svelte";
  import Write from "../components/write.svelte";
  import Tweet from "../components/tweet.svelte";
  import { host, username } from "../main";
  import { onMount } from "svelte";

  $: posts = [];
  onMount(async () => {
    let res = await fetch(host + "/api/posts");
    posts = await res.json();
  });

  async function update() {
    setTimeout(async () => {
      let res = await fetch(host + "/api/posts");
      posts = await res.json();
    }, 200);
  }
</script>

<style>
  .tweets {
    height: calc(100vh - 52px);
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .tweets::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 500px) {
    .tweets {
      height: calc(100vh - 52px - 46px);
    }
  }
</style>

<Head title="Вопросы">
  <i class="filter" />
</Head>
<div class="tweets">
  {#if $username != ''}
    <Write on:click={update} />
  {/if}

  {#each posts as p}
    <Tweet {...p} />
  {/each}

</div>
