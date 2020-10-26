<script>
  import { host } from "../main";
  import { onMount } from "svelte";

  export let question;
  export let cats = [];

  onMount(async () => {
    let res = await fetch(host + "/api/categories");
    let json = await res.json();
    let arr = [];
    json.forEach(j => {
      let category = { id: j.categoryID, name: j.name, value: false };
      arr.push(category);
    });
    cats = arr;
  });

  let count = 140;
  function autosize(e, size) {
    count = 140 - question.length;
    e.currentTarget.style.height = "1px";
    e.currentTarget.style.height = size + e.currentTarget.scrollHeight + "px";
  }
</script>

<style>
  textarea {
    width: 100%;
    background: var(--input-color);
    box-sizing: border-box;
    color: var(--text-color);
    padding: 20px;
    line-height: 1.8;
    font-size: 12px;
  }
  textarea {
    height: 96px;
    border: none;
    resize: none;
    overflow: hidden;
  }
  .text {
    position: relative;
  }
  .tags {
    position: absolute;
    bottom: 0;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
  }
  .tags label {
    margin-right: 16px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0.3;
    color: var(--secondary-color);
  }
  input {
    display: none;
  }
  input:checked + label {
    opacity: 1;
  }
  span {
    float: right;
    font-size: 10px;
    line-height: 25px;
    color: var(--secondary-color);
    opacity: 0.3;
  }
</style>

<div class="text">
  <textarea
    placeholder="Question breif"
    maxlength="140"
    bind:value={question}
    on:keyup={e => autosize(e, 34)} />

  <div class="tags">
    {#each cats as { id, name, value }}
      <input type="checkbox" {id} bind:checked={value} />
      <label for={id}>#{name}</label>
    {/each}
    <span>{count}</span>
  </div>
</div>
