<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>
 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object} 
       */
      googleSignInParams: {
        client_id: '930625657894-e1t7njqgt8bsudros6a8sega1hj924i8.apps.googleusercontent.com'
      },
      id: '',
      name: '',
      email: '',
      error: false,
      errorMessage : ''
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      this.name = profile.getName()
      this.email = profile.getEmail()
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "https://fancy-kanban-suryo.herokuapp.com/users/google-login",
        data: {
          googleToken: id_token
        }
      })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        this.$emit('emitpageChanger', 'home')
      })
      .catch((error) => {
        if (error.response) {
          this.showerror(error.response.data)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })

    },
    onSignInError (error) {
      console.log("kesitu");
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },

  }
}
</script> 
 
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
.errormessage {
  color: red;
}
</style> 