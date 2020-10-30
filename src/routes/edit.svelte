<script>
  import Head from "../elements/head.svelte";
  import Editor from "../components/editor.svelte";

  import { post, get } from "../main";
  import { pop } from "svelte-spa-router";

  export let params;

  let files;
  let title = "";
  let longtext = "";
  let chosenCats = [];

  (async function getPost() {
    const categs = obj => {
      let cats = [];
      obj.forEach(e => {
        cats.push(e.ID);
      });
      return cats;
    };
    let j = await get("/post?postID=" + params.id);
    title = j.Title;
    longtext = j.Text;
    chosenCats = categs(j.Categories);
  })();

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
