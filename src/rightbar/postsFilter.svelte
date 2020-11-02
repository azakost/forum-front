<script>
  import { cats, filter, sort } from "../main";
  let filterCat = "";
  let sorts = "";

  $: {
    filter.set(filterCat);
    sort.set(sorts);
  }
</script>

<style>
  input {
    display: none;
  }

  .filters {
    padding: 16px 24px;
  }

  label,
  h4 {
    margin-bottom: 16px;
  }

  .bycat,
  .sort {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    font-weight: 100;
  }

  input {
    display: none;
  }

  label {
    color: var(--secondary-color);
    cursor: pointer;
    opacity: 0.5;
  }

  input:checked + label {
    opacity: 1;
    font-weight: 500;
  }
</style>

<div class="filters">

  <div class="bycat">

    <h4>Фильтр по категориям:</h4>
    <input
      id="filter0"
      type="radio"
      value=""
      name="cats"
      checked
      bind:group={filterCat} />
    <label for="filter0">Все категории</label>
    {#await cats() then cat}
      {#each cat as { id, name }}
        <input
          id="filter{id}"
          type="radio"
          value={id}
          name="cats"
          bind:group={filterCat} />
        <label for="filter{id}">#{name}</label>
      {/each}
    {/await}
  </div>

  <div class="sort">

    <h4>Сортировка:</h4>
    <input
      id="sort0"
      type="radio"
      value=""
      name="sort"
      checked
      bind:group={sorts} />
    <label for="sort0">По времени</label>
    <input
      id="sort1"
      type="radio"
      value="likes"
      name="sort"
      bind:group={sorts} />
    <label for="sort1">По лайкам</label>

  </div>

</div>
