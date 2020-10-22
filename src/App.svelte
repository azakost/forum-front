<script>
  import Main from "./components/layout.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./router";
</script>

<style>
  :global(:root) {
    --primary-color: blue;
    --secondary-color: #1da1f2;
    --border-color: #38444d;
    --text-color: white;
    --bg-color: rgb(21, 32, 43);
    --menu-color: rgb(21, 32, 43);
    --topbar-color: rgb(21, 32, 43);
    --mobile-menu-text-color: rgb(136, 153, 166);
    --input-color: #192734;
    --input-color2: #1d2d3b;
    --border: 1px solid var(--border-color);
  }
</style>

<Main>
  <Router {routes} />
</Main>
