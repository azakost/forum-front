<script>
  import { onMount } from "svelte";
  export let name;
  export let error = null;
  export let value = "";
  export let type = "text";

  let el;
  onMount(() => {
    el.type = type;
  });
</script>

<style>
  input {
    border: none;
    background: var(--input-color);
    color: var(--text-color);
    height: 38px;
    padding: 10px 20px;
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  label {
    opacity: 0.4;
    font-size: 12px;
  }
  span {
    display: block;
    margin: 2px 0 6px;
    width: 100%;
    text-align: right;
    font-size: 10px;
    color: rgb(253, 61, 61);
    height: 14px;
  }

  div {
    position: relative;
  }

  i {
    position: absolute;
    right: 12px;
    top: calc(50% - 17.6px / 2);
  }

  i.alert-triangle {
    color: red;
  }
</style>

<label for="#">{name}</label>
<div>
  <input bind:this={el} on:keyup bind:value />
  <i class={error == null ? '' : error == '' ? 'check' : 'alert-triangle'} />
</div>

<span>{error == null ? '' : error}</span>
