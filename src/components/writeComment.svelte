<script>
  import Button from "../components/button.svelte";
  import { host, id } from "../main";
  export let comment = "";
  function autosize(e, size) {
    e.currentTarget.style.height = "1px";
    e.currentTarget.style.height = size + e.currentTarget.scrollHeight + "px";
  }
</script>

<style>
  textarea {
    background: var(--input-color);
    color: var(--text-color);
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 8px;
    line-height: 1.7;
    overflow: hidden;
    font-size: 13px;
    padding: 16px;
    height: 80px;
    border: none;
    resize: none;
    width: 100%;
  }

  .write {
    grid-template-columns: 38px auto;
    border-bottom: var(--border);
    padding: 16px;
    display: grid;
  }

  img {
    border-radius: 50%;
    margin-top: 6px;
    height: 38px;
  }

  .right-col {
    margin-left: 16px;
  }
</style>

<div class="write">
  <div>
    <img src="{host}/avatars/{$id}.jpg" alt="" />
  </div>
  <div class="right-col">
    <textarea
      placeholder="Комментарий"
      bind:value={comment}
      on:keyup={e => autosize(e, 30)} />
    <Button name="Опубликовать" small={true} on:click />
  </div>
</div>
