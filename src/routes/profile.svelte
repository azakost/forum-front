<script>
  import Head from "../components/head.svelte";
  import { push } from "svelte-spa-router";
  import { post, upload, username, fullname, id, update } from "../main";
  $: userid = $id;

  async function logout() {
    await post("/logout");
    localStorage.clear();
    username.set("");
    fullname.set("");
    push("/");
  }

  let files;
  async function uploadAva() {
    let res = await upload("/uploadava", "avatar", files);
    if (res.ok) update.set(Date.now());
  }
</script>

<style>
  .log-out {
    position: absolute;
    top: 17px;
    right: 16px;
    font-size: 18px;
  }

  img {
    height: 200px;
  }
</style>

<Head title={'Профиль'} />
<i class="log-out" on:click={logout} />

<img
  src="http://localhost:8080/avatars/{userid}.jpg?update={$update}"
  alt=""
  on:error={(userid = 0)} />

<input type="file" accept="image/jpeg" bind:files />
<button on:click={uploadAva}>Upload</button>
