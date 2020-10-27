<script>
  import Head from "../components/head.svelte";
  import { host } from "../main";
  export let params;

  async function viewPost() {
    let res = await fetch(host + "/api/posts?postID=" + params.id);
    let json = await res.json();
    console.log(json);
    return json[0];
  }
</script>

{#await viewPost() then post}
  <Head title="Вопрос от @ {post.Username}" />

  <p>{post.Title}</p>
  <div>
    {@html post.Text}
  </div>
{/await}
