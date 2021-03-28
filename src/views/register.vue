<template>
    <main class="container my-5">
        <div class="row" id="row">
          <section class="col login-col">
            <div class="card shadow p-5" id="main-body-login">
              <form @submit.prevent="registerUser">
                <h3 class="text-center text-uppercase mb-4">Register</h3>
                <p style="color: red"> {{ errorMessage }} </p>
                <hr>
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Name" class="form-control" v-model="register_name">
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Email" class="form-control" v-model="register_email">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="password" class="form-control" v-model="register_password">
                </div>
                <div id="button-register">
                    <button type="submit" class="btn btn-block btn-secondary rounded-pill mt-3 actions">Register</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            register_name: "",
            register_email: "",
            register_password: "",
            error: false,
            errorMessage : ''
        };
    },
    methods: {
        registerUser(){
            axios({
                method: "POST",
                url: 'https://fancy-kanban-suryo.herokuapp.com/users/register',
                data: {
                    name: this.register_name,
                    email: this.register_email,
                    password: this.register_password,
                }
            })
            .then(response => {
              this.errorMessage = ''
              this.$emit('emitpageChanger', 'login')
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
              this.register_name= "",
              this.register_email= "",
              this.register_password= ""  
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
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
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
</style>>
