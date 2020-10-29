<script>
  import Head from "../components/head.svelte";
  import Card from "../components/card.svelte";
  import Textarea from "../components/textarea.svelte";
  import Button from "../components/button.svelte";
  import Comment from "../components/comment.svelte";
  import Post from "../components/postLayout.svelte";
  import { get, username, currentPost, post, id } from "../main";

  export let params;
  let comments = [];
  const viewPost = async () => await get("/post?postID=" + params.id);
  const getComments = async () => {
    comments = await get("/comments?postID=" + params.id);
    if (comments == null) comments = [];
  };
  viewPost();
  getComments();

  let lastReact = "";
  async function like(e) {
    let res = await post("/reaction", {
      postID: e.detail.id,
      reaction: "like"
    });
  }

  async function dislike(e) {
    let res = await post("/reaction", {
      postID: e.detail.id,
      reaction: "dislike"
    });
  }

  async function plus(e) {
    let res = await post("/reaction", {
      commentID: e.detail.id,
      reaction: "like"
    });
  }

  async function minus(e) {
    let res = await post("/reaction", {
      commentID: e.detail.id,
      reaction: "dislike"
    });
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
      getComments();
      value = "";
    }
  }
</script>

<Head title="Вопрос от @{$currentPost.user}" secondLevel={true} />

<div class="scrollable">
  {#await viewPost() then post}
    <Post {...post} on:like={like} on:dislike={dislike} on:edit={report} />
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
  {#each comments as com}
    <Card {...com} on:plus={plus} on:minus={minus} />
  {/each}

</div>
