<script>
  import { auth } from "../firebase";
  import { onMount } from "svelte";

  $: userId = "";

  function SigninToggle() {
    console.log("Signing");
    if (auth.currentUser) {
      auth.signOut();
    } else {
      auth.signInAnonymously().catch(error => {
        // Handle Errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error:", errorCode, errorMessage);
      });
    }
  }

  function InitAuth() {
    auth.onAuthStateChanged(user => {
      if (user) {
        userId = user.uid;
      } else {
        userId = "";
      }
    });
  }

  onMount(() => {
   InitAuth();
  });

</script>

<button on:click={SigninToggle}>{!userId ? 'Sign in' : 'Sign out'}</button>

<p>{userId ? `Welcome ${userId}` : ''}</p>
