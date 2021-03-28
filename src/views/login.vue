<template>
<main class="container my-5">
  <div class="row" id="row">
    <section class="col login-col">
      <div class="card shadow p-5" id="main-body-login">
        <form @submit.prevent="loginUser">
          <h3 class="text-center text-uppercase mb-4">Login</h3>
          <p style="color: red"> {{ errorMessage }} </p>
          <hr>
          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email" class="form-control" v-model="login_email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" placeholder="password" class="form-control" v-model="login_password">
          </div>
          <div id="button-register">
              <button type="submit" class="btn btn-block btn-secondary rounded-pill mt-3 actions">Login</button>
              
          </div>
           <div class="form-group-google">
            <p>---------------OR---------------</p>
            <google @emitpageChanger="pageChanger"></google>
          </div>
        </form>
      </div>
    </section>
  </div>
</main>
</template>

<script>
import axios from 'axios'
import google from "./google"
export default {
  components: {
    google
  },
  data() {
    return {
      login_email: "",
      login_password: "",
      error: false,
      errorMessage : ''
    }
  },
  methods: {
    pageChanger(value) {
      this.$emit('emitpageChanger2', value)
    },
    loginUser(){
      axios({
        method: "POST",
        url: "https://fancy-kanban-suryo.herokuapp.com/users/login",
        data: {
          email: this.login_email,
          password: this.login_password
        }
      })
      .then(response => {
        // console.log(response.data.access_token);
        localStorage.setItem("access_token", response.data.access_token)
        this.$emit('emitpageChanger2', 'home')
      })
      .catch((error) => {
        if (error.response) {
          this.showerror(error.response.data.message)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
       .then(() => {
          this.login_email= "",
          this.login_password= ""
        })
    },
    showerror(error) {
         this.errorMessage = ''
          if(Array.isArray(error)){
            for (let a = 0; a < error.message.length; a++) {
              this.errorMessage += error.message[a]
              if (a+1 !== error.message.length) {
                this.errorMessage += ", "
              } else {
                 this.errorMessage += "."
              }
            }
            this.error = true
          } else {
            this.errorMessage = error
            this.error = true
          }
        }
  }
}
</script>

<style scoped>
main .card {
    background-color: #3475;
  }
  body {
    background: #fe8c00; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #98FF98,
      #A7FFA7
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #bffcbf,
      #b5dbb5
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: white;
  }
  h3 {
    font-family: Times New Roman;
    font-weight: bold;
  }
  hr {
    border-bottom: solid white 1px;
  }
  #button-register{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
  }
  .actions {
      width: 442px;
      height: 38px;
    background: #0f2027; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #2c5364,
      #203a43,
      #0f2027
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #2c5364,
      #203a43,
      #0f2027
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  input {
    background-color: #3475 !important;
    color: white !important;
  }
  ::placeholder {
    color: white !important;
  }
  #main-body-login {
      border-radius: 15px;
  }
  .login-col {
    display: flex;
    justify-content: center;
  }

.g-signin-button {
  width: 302px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  text-align: center;
}

p {
  margin-top: 5px;
}

.errormessage {
  color: red;
}
.form-group-google {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>>