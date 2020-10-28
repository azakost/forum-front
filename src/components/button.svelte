<script>
  export let name;
  export let disabled = false;
  export let small = false;
</script>

<style>
  button {
    background: var(--secondary-color);
    color: var(--text-color);
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    float: right;
  }

  button:disabled {
    opacity: 0.5;
  }

  [aria-checked="false"] {
    margin: 16px 0;
    height: 38px;
    width: 100%;
  }

  [aria-checked="true"] {
    border-radius: 50px;
  }
</style>

<button aria-checked={small} on:click {disabled}>{name}</button>
