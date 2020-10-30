<script>
  import Head from "../elements/head.svelte";
  import {
    post,
    upload,
    username,
    fullname,
    id,
    update,
    host,
    logout
  } from "../main";

  $: userid = $id;

  let files;
  function uploadAva() {
    setTimeout(async () => {
      let res = await upload("/uploadava", "avatar", files);
      if (res.ok) {
        let i = $id;
        id.set(i);
        update.set(Date.now());
      }
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
    width: 200px;
    object-fit: cover;
    object-position: 50% 50%;
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
