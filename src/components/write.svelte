<script>
  import { host } from "../main";
  import { onMount } from "svelte";

  let question;
  let cats = [];

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
    background: var(--input-color);
    color: var(--text-color);
    box-sizing: border-box;
    line-height: 1.8;
    font-size: 12px;
    padding: 20px;
    width: 100%;
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
    box-sizing: border-box;
    position: absolute;
    padding: 20px;
    width: 100%;
    bottom: 0;
  }
  .tags label {
    color: var(--secondary-color);
    margin-right: 16px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0.2;
  }
  input {
    display: none;
  }
  input:checked + label {
    opacity: 1;
  }
  span {
    color: var(--secondary-color);
    line-height: 25px;
    font-size: 10px;
    float: right;
    opacity: 0.2;
  }
  .bottom {
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    display: flex;
    border-bottom: var(--border);
  }
  button {
    background: var(--secondary-color);
    color: var(--text-color);
    border-radius: 50px;
    padding: 6px 12px;
    cursor: pointer;
    border: none;
  }
</style>

<div class="text">
  <textarea
    placeholder="На чем застряли?"
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
<div class="bottom">
  <i class="maximize" />
  <button on:click>Спросить сообщество</button>
</div>
