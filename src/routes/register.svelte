<script>
  import Head from "../elements/head.svelte";
  import Input from "../elements/input.svelte";
  import Button from "../elements/button.svelte";
  import { push } from "svelte-spa-router";
  import { post, tmpuser } from "../main";

  $: user = "";
  $: full = "";
  $: email = "";
  $: pass1 = "";
  $: pass2 = "";

  let usrErr, fnErr, emailErr, passErr, pass2Err;
  async function register() {
    let res = await post("/register", {
      username: user,
      email: email,
      fullname: full,
      password: pass1
    });

    if (res.ok) {
      tmpuser.set(user);
      push("/login");
    } else {
      let errs = await res.json();
      usrErr = errs.UsernameExist && "Такой никнейм уже зарегистрирован";
      emailErr = errs.EmailExist && "Такой email уже зарегистрирован";
      usrErr = errs.UsernameFormat && "Неверный формат никнейма";
      fnErr = errs.FullnameFormat && "Имя, фамилия слишком короткие";
      emailErr = errs.EmailFormat && "Формат электронной почты неверен";
      passErr = errs.PasswordFormat && "Пароль слишком короткий";
    }
  }
</script>

<Head title={'Регистрация'} />

<div class="form">

  <Input name={'Никнейм'} bind:value={user} error={usrErr} />
  <Input name={'Имя, Фамилия'} bind:value={full} error={fnErr} />
  <Input
    name="Электронная почта"
    bind:value={email}
    type="email"
    error={emailErr} />
  <Input name={'Пароль'} bind:value={pass1} type={'password'} error={passErr} />
  <Input
    name="Повторите пароль"
    bind:value={pass2}
    type="password"
    error={pass1 != pass2 ? (pass2Err = 'Пароли не совпадают!') : null} />
  <Button
    name="Зарегистрироваться"
    on:click={register}
    disabled={pass1 != pass2 || pass1 == ''} />

</div>
