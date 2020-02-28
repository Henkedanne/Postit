<script>
  import { fly } from "svelte/transition";
  export let text;
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
</style>

<div class="postit" transition:fly={{ y: -20, duration: 300 }}>
  <p class="text">{text}</p>
</div>
