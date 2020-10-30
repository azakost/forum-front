<script>
  import Head from "../elements/head.svelte";
  import Textarea from "../elements/textarea.svelte";
  import Button from "../elements/button.svelte";

  import Card from "../components/card.svelte";
  import Article from "../components/article.svelte";

  import { get, username, post, id } from "../main";

  export let params;

  $: viewPost = async () => await get("/post?postID=" + params.id);
  $: getComments = async () => {
    let res = await get("/comments?postID=" + params.id);
    return res == null ? [] : res;
  };

  $: comments = getComments();

  async function react(e) {
    let emo = e.detail.reaction;
    let obj;
    if (e.detail.type == "article") {
      obj = {
        postID: e.detail.id,
        reaction: emo
      };
    } else {
      obj = {
        commentID: e.detail.id,
        reaction: emo
      };
    }
    let res = await post("/reaction", obj);
  }

  function report(e) {
    alert("report");
  }

  let value = "";
  async function writeComment() {
    let res = await post("/writecomment", {
      postID: parseInt(params.id),
      comment: value
    });
    if (res.ok) {
      comments = getComments();
      value = "";
    }
  }
</script>

<Head title="Вопрос" secondLevel={true} />

<div class="scrollable">
  {#await viewPost() then post}
    <Article {...post} on:like={react} on:dislike={react} on:edit={report} />
  {/await}
  {#if $username != ''}
    <Card uid={$id}>
      <div slot="blank">
        <Textarea placeholder="Ваш комментарий" autoresize={true} bind:value />
        <br style="display:block; margin: 8px" />
        <Button name="Опубликовать" small={true} on:click={writeComment} />
      </div>
    </Card>
  {/if}
  {#await comments}
    <p>Loading...</p>
  {:then com}
    {#each com as c}
      <Card {...c} on:plus={react} on:minus={react} />
    {/each}
  {/await}

</div>
