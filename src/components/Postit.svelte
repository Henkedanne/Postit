<script>
  import { fly } from "svelte/transition";
  import { posts } from "../stores/stores.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let text;
  export let id;

  let hover = false;

  function handleMouseEnter() {
    hover = true;
  }

  function handleMouseLeave() {
    hover = false;
  }

  function handleRemove(id) {
    posts.removePost(id);
  }

  function handleDragStart(e) {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  function handleDragOver(e) {
    e.preventDefault();
    dispatch("dropoverid", {
      id: e.target.id
    });
  }
</script>

<style>
  .postit {
    display: flex;
    justify-content: center;
    margin: 5px;
    position: relative;
    padding: 10px 5px;
    height: 200px;
    width: 200px;
    background: rgb(197, 212, 255);
    align-items: center;
  }
  .postit:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    width: 100%;
    background: rgb(155, 189, 241);
  }
  .remove {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }
</style>

<div
  {id}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="postit"
  draggable="true"
  transition:fly={{ y: -20, duration: 300 }}
  on:dragstart={handleDragStart}
  on:dragover={handleDragOver}>
  {#if hover}
    <span on:click={handleRemove(id)} class="remove">X</span>
  {/if}
  <p class="text">{text}</p>
</div>
