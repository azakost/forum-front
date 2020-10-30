<script>
  import Head from "../elements/head.svelte";
  import { push } from "svelte-spa-router";
  import { post, upload, username, fullname, id, update, host } from "../main";

  $: userid = $id;

  async function logout() {
    await post("/logout");
    localStorage.clear();
    username.set("");
    fullname.set("");
    push("/");
  }

  let files;
  function uploadAva() {
    setTimeout(async () => {
      let res = await upload("/uploadava", "avatar", files);
      if (res.ok) {
        let i = $id;
        id.set(0);
        id.set(i);
        update.set(Date.now());
      }
      console.log(res);
    }, 200);
  }
</script>

<style>
  .log-out {
    position: absolute;
    font-size: 18px;
    right: 16px;
    top: 17px;
  }

  img {
    border-radius: 50%;
    height: 200px;
  }

  .imgUpload {
    position: relative;
  }

  .imgUpload > i {
    color: red;
    position: absolute;
  }

  input {
    position: absolute;
    opacity: 1;
  }
</style>

<Head title={'Профиль'} />
<i class="log-out" on:click={logout} />

<div class="imgUpload">
  <i class="edit" />
  <input type="file" accept="image/jpeg" bind:files on:input={uploadAva} />
  <img
    src="{host}/avatars/{userid}.jpg?u={$update}"
    on:error={() => (userid = 0)}
    alt="" />
</div>
