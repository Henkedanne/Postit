<script>
  import Postit from "./components/Postit.svelte";
  import { posts } from "./stores/stores.js";
  import Postinput from "./components/Postinput.svelte";
  export let name;
</script>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    grid-column-gap: 10px;
    align-items: center;
    justify-content: center;
    width: auto;
  }

  h1 {
    color: #2600ff;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  aside {
    height: 100%;
    width: 200px;
    border-right: 1px solid #2600ff;
    float: left;
  }

  p {
    margin-left: 10px;
  }
</style>

<main>
  <h1>{name}</h1>
  <aside>
    <Postinput />
  </aside>
  <div class="grid">
    {#if $posts.length > 0}
      {#each $posts as { text, id }}
        <Postit {text} {id} />
      {/each}
    {:else}
      <p>Add some post-its</p>
    {/if}
  </div>
</main>
