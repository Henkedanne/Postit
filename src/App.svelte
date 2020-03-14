<script>
  import Postit from "./components/Postit.svelte";
  import { posts } from "./stores/stores.js";
  import Postinput from "./components/Postinput.svelte";
  import Signin from './components/Signin.svelte';
  import { onMount } from "svelte";
  import {db} from './firebase';

  export let name;
  let dropoverid;

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    if (!dropoverid) {
      return false;
    }

    const id = e.dataTransfer.getData("text/plain");
    const dropOverItem = document.getElementById(dropoverid);
    const draggedItem = document.getElementById(id);

    if (dropOverItem.nextElementSibling) {
      draggedItem.parentNode.insertBefore(draggedItem, dropOverItem);
    } else {
      draggedItem.parentNode.appendChild(draggedItem);
    }
  }
  function setDropOverID(e) {
    dropoverid = e.detail.id;
  }

  console.log(db);
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
  <Signin/>
  <aside>
    <Postinput />
  </aside>
  <div class="grid" on:dragover={handleDragOver} on:drop={handleDrop}>
    {#if $posts.length > 0}
      {#each $posts as { text, id }}
        <Postit {text} {id} on:dropoverid={setDropOverID} />
      {/each}
    {:else}
      <p>Add some post-its</p>
    {/if}
  </div>
</main>
