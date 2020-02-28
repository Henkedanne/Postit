<script>
  import { posts } from "../stores/stores.js";
  let text = "";
  let id = 1;
  function handleSubmit() {
    posts.addPost(text, id);
    text = "";
    id++;
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={text} />
  <button type="submit" disabled={!text}>Add</button>
  <button type="reset" on:click={posts.reset}>Clear</button>
</form>
