<script>
  export let value;
  export let placeholder;
  export let autoresize = false;
  export let max = -1;

  const autosize = e => {
    if (autoresize) {
      let size = 30;
      e.currentTarget.style.height = "1px";
      e.currentTarget.style.height = size + e.currentTarget.scrollHeight + "px";
    }
  };
</script>

<style>
  textarea {
    background: var(--input-color);
    color: var(--text-color);
    box-sizing: border-box;
    border-radius: 5px;
    line-height: 1.7;
    overflow: hidden;
    font-size: 13px;
    padding: 16px;
    height: 84px;
    border: none;
    resize: none;
    width: 100%;
  }
</style>

<textarea {placeholder} bind:value on:input={autosize} maxlength={max} />
