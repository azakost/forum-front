<script>
  import Head from "../components/head.svelte";
  import Write from "../components/write.svelte";
  import { host } from "../main";
  posts();
  async function posts() {
    let res = await fetch(host + "/api/posts");
    let js = await res.json();
    console.log(js);
  }
</script>

<Head title="Вопросы">
  <i class="filter" />
</Head>

<Write />
