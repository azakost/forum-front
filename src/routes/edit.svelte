<script>
  import Head from "../components/head.svelte";
  import Write from "../components/writePost.svelte";
  import { currentPost, post } from "../main";
  import { push, pop } from "svelte-spa-router";

  export let params;

  let files;
  let title = $currentPost.title;
  let longtext = $currentPost.text;
  let chosenCats = $currentPost.cats;

  async function deletePost(e) {
    if (confirm("Вы уверены?")) {
      let res = await post("/writepost", {
        postID: parseInt(params.id),
        status: 0
      });
      if (res.ok) {
        push("/");
      }
    }
  }

  async function updatePost(e) {
    let res = await post("/writepost", {
      postID: parseInt(params.id),
      title: title,
      text: longtext,
      categories: chosenCats,
      status: 1
    });
    if (res.ok) {
      pop();
    }
  }
</script>

<Head title="Редактирование" secondLevel={true} />
<Write
  bind:files
  bind:title
  bind:longtext
  bind:chosenCats
  on:click={updatePost}
  on:delete={deletePost}
  button="Обновить"
  fullsize={true} />
