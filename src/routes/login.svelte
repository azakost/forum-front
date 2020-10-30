<script>
  import Head from "../elements/head.svelte";
  import Input from "../elements/input.svelte";
  import Button from "../elements/button.svelte";

  import { post, tmpuser, username, fullname, id, save } from "../main";

  $: user = $tmpuser;
  $: pass = "";
  let shake = "";

  async function login() {
    let res = await post("/login", { username: user, password: pass });
    if (res.ok) {
      let json = await res.json();
      save("id", id, json.userID);
      save("username", username, json.username);
      save("fullname", fullname, json.fullname);
      window.location = "/";
    } else {
      shake = "shake";
      setTimeout(() => (shake = ""), 500);
    }
  }
</script>

<style>
  i {
    margin-right: 4px;
  }
  .sub {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .shake {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0% {
      padding-left: 40px;
      padding-right: 40px;
    }
    25% {
      padding-left: 20px;
      padding-right: 60px;
    }
    50% {
      padding-left: 60px;
      padding-right: 20px;
    }
    75% {
      padding-left: 20px;
      padding-right: 60px;
    }
    100% {
      padding-left: 40px;
      padding-right: 40px;
    }
  }
</style>

<Head title="Вход в систему" />
<div class="form {shake}">
  <Input name="Имя пользователя" bind:value={user} />
  <Input name="Пароль" type="password" bind:value={pass} />
  <Button name="Войти" on:click={login} />
</div>
<div class="sub">
  <a href="http://ya.ru">
    <i class="github" />
    <span>Войти через Git</span>
  </a>
  &ensp;&ensp;&bull;&ensp;&ensp;
  <a href="/#/register">
    <i class="user-plus" />
    <span>Регистрация</span>
  </a>
</div>
