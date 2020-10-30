<script>
  import Head from "../elements/head.svelte";
  import Editor from "../components/editor.svelte";

  import { post, get } from "../main";
  import { pop } from "svelte-spa-router";
  import { onMount } from "svelte";

  export let params;

  let files;

  $: title = "";
  $: longtext = "";
  $: chosenCats = [];

  $: if (params.id) getPosts();

  async function getPosts() {
    let res = await get("/post?postID=" + params.id);

    const categs = obj => {
      let cats = [];
      obj.forEach(e => {
        cats.push(e.ID);
      });
      return cats;
    };
    title = res.Title;
    longtext = res.Text;
    chosenCats = categs(res.Categories);
  }

  async function deletePost(e) {
    if (confirm("Вы уверены?")) {
      let res = await post("/writepost", {
        postID: parseInt(params.id),
        status: 0
      });
      if (res.ok) window.location = "/";
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
    if (res.ok) pop();
  }
</script>

<Head title="Редактирование" secondLevel={true} />

<Editor
  bind:files
  bind:title
  bind:longtext
  bind:chosenCats
  on:click={updatePost}
  on:delete={deletePost}
  button="Обновить"
  fullsize={true} />
