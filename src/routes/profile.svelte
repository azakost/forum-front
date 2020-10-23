<script>
  import Head from "../components/head.svelte";
  import { push } from "svelte-spa-router";
  import { post, username, fullname } from "../main";

  async function logout() {
    await post("/logout");
    localStorage.clear();
    username.set("");
    fullname.set("");
    push("/");
  }
</script>

<style>
  .log-out {
    position: absolute;
    top: 17px;
    right: 16px;
    font-size: 18px;
  }
</style>

<Head title={'Профиль'} />
<i class="log-out" on:click={logout} />
<img src="http://localhost:8080/avatars/0.png" alt="" />
