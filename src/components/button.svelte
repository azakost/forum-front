<script>
  export let name;
  export let disabled = false;
</script>

<style>
  button {
    display: block;
    width: 100%;
    height: 38px;
    background: var(--secondary-color);
    color: var(--text-color);
    border: none;
    cursor: pointer;
    margin-top: 16px;
  }

  button:disabled {
    opacity: 0.5;
  }
</style>

<button on:click {disabled}>{name}</button>
