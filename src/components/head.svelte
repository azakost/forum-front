<script>
  export let secondLevel = false;
  export let title = "No title";
  import { pop } from "svelte-spa-router";
</script>

<style>
  header {
    justify-content: space-between;
    border-bottom: var(--border);
    position: absolute;
    padding: 0 16px;
    height: 52px;
    width: 100%;
  }

  header,
  div {
    align-items: center;
    display: flex;
  }

  .arrow-left {
    margin-right: 16px;
    display: none;
  }

  div:last-child {
    display: none;
  }

  @media only screen and (max-width: 1078px) {
    div:last-child {
      display: block;
    }
  }

  @media only screen and (max-width: 500px) {
    header {
      padding-right: 68px !important;
    }
    .arrow-left {
      display: initial;
    }
  }
</style>

<header>
  <div>
    {#if secondLevel}
      <i class="arrow-left" on:click={pop} />
    {/if}
    <h4>{title}</h4>
  </div>
  <div>
    <slot />
  </div>
</header>
