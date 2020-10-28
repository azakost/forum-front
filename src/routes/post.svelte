<script>
  import Head from "../components/head.svelte";
  import Write from "../components/writeComment.svelte";
  import Comment from "../components/comment.svelte";
  import Post from "../components/postLayout.svelte";
  import { host, username, currentAuthor, post } from "../main";
  import { onMount } from "svelte";

  export let params;
  $: post = {};
  async function viewPost() {
    let res = await fetch(host + "/api/posts?postID=" + params.id);
    let json = await res.json();
    post = json[0];
  }

  // Initial posts loading
  onMount(async () => await viewPost());

  async function like(e) {
    let res = await post("/reaction", {
      postID: e.detail.id,
      reaction: "like"
    });
    if (res.ok) viewPost();
  }

  async function dislike(e) {
    let res = await post("/reaction", {
      postID: e.detail.id,
      reaction: "dislike"
    });
  }

  function report(e) {
    alert("report");
  }

  function writeComment() {
    alert("Write");
  }
</script>

<Head title="Вопрос от @{$currentAuthor}" secondLevel={true} />

<Post {...post} on:like={like} on:dislike={dislike} on:report={report}>
  <div slot="write">
    <Write on:click={writeComment} />
  </div>
  <div slot="comments">
    <Comment />
  </div>
</Post>
