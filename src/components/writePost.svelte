<script>
  import { username, cats } from "../main";
  import Button from "../components/button.svelte";
  export let title;
  export let longtext;
  export let chosenCats;
  export let files = null;

  let toggle = "mixed";

  // Limitators
  $: disabled = !(title.length > 3 && chosenCats.length != 0);
  $: disabledCats = chosenCats.length > 1;

  // Small fix in case if form has been scrolled for a little
  const scrollTop = () =>
    document.getElementsByClassName("tweets")[0].scrollTo(0, 0);
</script>

<style>
  /* Main layout */
  .tweets {
    height: calc(100vh - 52px);
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .tweets::-webkit-scrollbar {
    display: none;
  }

  .true {
    overflow: hidden;
  }

  .write {
    position: relative;
  }

  .short {
    background: var(--input-color);
    margin-bottom: 60px;
    padding: 16px;
  }

  .long {
    border-bottom: var(--border);
    background: var(--bg-color);
    position: absolute;
    margin-top: -60px;
    width: 100%;
    z-index: 9;
  }

  /* Textarea */
  textarea {
    color: var(--text-color);
    box-sizing: border-box;
    line-height: 1.7;
    background: none;
    overflow: hidden;
    font-size: 13px;
    height: 80px;
    border: none;
    resize: none;
    width: 100%;
  }

  /* Categories picker */
  input {
    display: none;
  }

  .cats > label {
    color: var(--secondary-color);
    margin-right: 16px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0.2;
  }

  input:checked + label {
    opacity: 1;
  }

  /* Editor */
  .editor {
    background: var(--input-color);
    border-top: var(--border);
    -ms-overflow-style: none;
    scrollbar-width: none;
    font-weight: 200;
    font-size: 13px;
    line-height: 1.8;
    overflow: auto;
  }

  .editor[aria-checked="true"]:empty:not(:focus):before {
    display: block;
  }

  .editor:empty:not(:focus):before {
    content: attr(placeholder);
    pointer-events: none;
    color: #93999f;
    font-size: 12px;
    display: none;
  }

  /* Actions panel */
  .actions {
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 16px;
  }

  span {
    margin-right: 16px;
    font-size: 12px;
    opacity: 0.3;
  }

  i {
    opacity: 0.5;
  }

  i:first-child {
    margin-right: 16px;
  }

  /* Toggler */
  [aria-checked="true"] {
    height: calc(100vh - 249px);
    animation: 0.3s down;
    padding: 16px;
  }

  [aria-checked="false"] {
    animation: 0.3s up;
    padding: 0;
    height: 0;
  }

  @keyframes up {
    0% {
      height: calc(100vh - 249px);
    }
    50% {
      height: cacl(50vh - 124px);
    }
    100% {
      height: 0;
    }
  }

  @keyframes down {
    0% {
      height: 0;
    }
    50% {
      height: cacl(50vh - 124px);
    }
    100% {
      height: calc(100vh - 249px);
    }
  }

  @media only screen and (max-width: 500px) {
    .tweets {
      height: calc(100vh - 52px - 46px);
    }

    [aria-checked="true"] {
      height: calc(100vh - 249px - 46px);
      animation: 0.3s downm;
    }

    [aria-checked="false"] {
      animation: 0.3s upm;
    }

    @keyframes upm {
      0% {
        height: calc(100vh - 249px - 46px);
      }
      50% {
        height: cacl(50vh - 124px);
      }
      100% {
        height: 0;
      }
    }

    @keyframes downm {
      0% {
        height: 0;
      }
      50% {
        height: cacl(50vh - 124px);
      }
      100% {
        height: calc(100vh - 249px - 46px);
      }
    }
  }
</style>

<div class="tweets {toggle}">
  <!-- Don't show form if user is not logged on -->
  {#if $username != ''}
    <div class="write">
      <div class="short">
        <textarea
          placeholder="На чем застряли?"
          bind:value={title}
          maxlength="140" />
        <div class="cats">

          <!-- Render all categories from database -->
          {#await cats() then cat}
            {#each cat as { id, name }}
              <input
                {id}
                type="checkbox"
                bind:group={chosenCats}
                value={id}
                disabled={chosenCats.includes(id) ? false : disabledCats} />
              <label for={id}>#{name}</label>
            {/each}
          {/await}

        </div>
      </div>
      <div class="long">
        <div
          placeholder="Расширенное пояснение"
          bind:innerHTML={longtext}
          contenteditable="true"
          aria-checked={toggle}
          class="editor" />
        <div class="actions">
          <div>

            <!-- Toggle full form opening & closing if clicked on chevron icon -->
            <i
              class="chevrons-{toggle == 'true' ? 'up' : 'down'}"
              on:click={() => {
                scrollTop();
                toggle = toggle == 'mixed' || toggle == 'false' ? 'true' : 'false';
              }} />
            <label for="image">

              <!-- Toggle full form opening if clicked on image icon -->
              <i
                class="image"
                on:click={() => {
                  scrollTop();
                  toggle = 'true';
                }} />
            </label>
          </div>
          <div>
            <span>{140 - title.length}</span>
            <Button
              name={'Спросить'}
              small={true}
              on:click
              {disabled}
              on:click={() => toggle == 'true' && (toggle = 'false')} />
          </div>
        </div>
      </div>
    </div>
  {/if}
  <slot />
</div>

<!-- Hidden file input element -->
<input
  type="file"
  id="image"
  bind:files
  accept=".jpg,.jpeg,.png,.gif"
  on:change />
