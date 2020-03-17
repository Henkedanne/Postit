<script>
  import { auth } from "../firebase";
  import { onMount } from "svelte";
  import { user } from '../stores/stores';

  console.log( 'users', $user)
  function SigninToggle() {
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
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
      console.log("Signing in:", firebaseUser.uid );
        user.setUser(firebaseUser.uid);
      } else {
        user.removeUser()
        console.log('sign out')
      }
    });
  }

  onMount(() => {
   InitAuth();
  });

</script>

<button on:click={SigninToggle}>{!$user ? 'Sign in' : 'Sign out'}</button>

<p>{$user ? `Welcome ${$user}` : ''}</p>
