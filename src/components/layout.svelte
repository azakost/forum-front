<script>
  import { location } from "svelte-spa-router";
  $: page = $location.split("/")[1];
</script>

<style>
  main {
    grid-template-columns: 275px 598px 392px;
    max-width: calc(275px + 598px + 392px);
    position: relative;
    margin: 0 auto;
    height: 100vh;
    display: grid;
  }

  .menu {
    border-right: var(--border);
    flex-direction: column;
    overflow: hidden;
    display: flex;
  }

  .basic {
    border-right: var(--border);
  }

  .content {
    position: relative;
  }

  /* Adaptive layout props */
  @media only screen and (max-width: 1265px) {
    main {
      grid-template-columns: 68px 598px 392px;
      max-width: calc(68px + 598px + 392px);
    }
    span {
      display: none;
    }
    li {
      display: none;
    }
  }

  @media only screen and (max-width: 1078px) {
    main {
      grid-template-columns: 68px auto;
      max-width: calc(88px + 598px);
    }
    .rightbar {
      display: none;
    }
  }

  @media only screen and (max-width: 686px) {
    .basic {
      border-right: none !important;
    }
  }

  @media only screen and (max-width: 500px) {
    main {
      grid-template-columns: auto;
    }
    .menu {
      flex-direction: row !important;
      justify-content: space-around;
      border-right: none !important;
      border-top: var(--border);
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }
    .login {
      bottom: auto !important;
      left: auto !important;
      right: 0;
      top: 0;
    }
  }

  /* Menu links */
  a {
    align-items: center;
    margin: 11px 0;
    display: flex;
    opacity: 0.8;
  }

  i {
    margin: 0 22px;
    font-size: 24px;
  }

  span {
    font-size: 18px;
  }

  /* Profile - login item */
  img {
    border-radius: 50%;
    margin: 0 19px;
    height: 30px;
  }

  ul:last-child {
    font-size: 0.7em;
    margin-top: 4px;
  }

  .login {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  /* Links highlight */

  [aria-current="page"] {
    color: var(--secondary-color);
    font-weight: bold;
  }

  [aria-current="page"]:hover {
    opacity: 1;
  }
</style>

<main>

  <div class="menu">
    <a href="/#" aria-current={page == '' || page == 'posts' ? 'page' : ''}>
      <i class="help-circle" />
      <span>Вопросы</span>
    </a>
    <a href="/#/replies" aria-current={page == 'replies' ? 'page' : ''}>
      <i class="message-circle" />
      <span>Ответы</span>
    </a>
    <a href="/#/knowlege" aria-current={page == 'knowlege' ? 'page' : ''}>
      <i class="book-open" />
      <span>Знания</span>
    </a>
    <a href="/#/ranking" aria-current={page == 'ranking' ? 'page' : ''}>
      <i class="award" />
      <span>Рейтинг</span>
    </a>

  </div>

  <div class="basic">
    <a href="/#/profile" class="login">
      <img src="placeholder.png" alt="" />
      <li>
        <ul>Hello, student!</ul>
        <ul>Please, log in...</ul>
      </li>
    </a>
    <div class="content">
      <slot />
    </div>

  </div>

  <div class="rightbar">Rightbar</div>

</main>
