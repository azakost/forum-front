<script>
  import Head from "../components/head.svelte";
  import Write from "../components/writePost.svelte";
  import Card from "../components/card.svelte";
  import { host, post, upload } from "../main";
  import { onMount } from "svelte";

  $: posts = [];
  async function update() {
    let res = await fetch(host + "/api/posts");
    posts = await res.json();
    if (posts == null) {
      posts = [];
    }
  }

  // Initial posts loading
  onMount(async () => await update());

  // Question submit
  let title = "";
  let longtext = "";
  let chosenCats = [];
  async function questionSubmit() {
    let res = await post("/writepost", {
      title: title,
      text: longtext,
      categories: chosenCats
    });

    if (res.ok) {
      // Update posts list after submission and clear form
      update();
      title = "";
      longtext = "";
      chosenCats = [];
    }
  }

  // Upload to server and add image to post
  let files;
  function addImage() {
    setTimeout(async () => {
      let res = await upload("/uploadimg", "image", files);
      let url = await res.text();
      longtext +=
        '<img src="' + host + url + '" alt="" style="max-width:100%" /><br>';
    }, 200);
  }
</script>

<Head title="Вопросы">
  <i class="filter" />
</Head>
<div class="scrollable">
  <Write
    bind:files
    bind:title
    bind:longtext
    bind:chosenCats
    on:click={questionSubmit}
    on:change={addImage} />
  {#each posts as p}
    <Card {...p} />
  {/each}

</div>
