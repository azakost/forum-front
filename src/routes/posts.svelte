<script>
  import Head from "../elements/head.svelte";

  import Editor from "../components/editor.svelte";
  import Card from "../components/card.svelte";

  import { host, post, upload, filter, sort } from "../main";

  $: update = async () => {
    let res = await fetch(
      host + "/api/posts?cat=" + $filter + "&byreact=" + $sort
    );
    return await res.json();
  };

  $: posts = update();

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
      posts = update();
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
  <Editor
    bind:files
    bind:title
    bind:longtext
    bind:chosenCats
    on:click={questionSubmit}
    on:change={addImage} />
  {#await posts then posts}
    {#if posts != null}
      {#each posts as p}
        <Card {...p} />
      {/each}
    {/if}
  {/await}

</div>
