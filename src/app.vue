<template>
<div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbarid">
        <div class="container-fluid">
          <h3 class="title">Fancy Kanban</h3>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" href="#" id="nav-register" 
              v-if="isLogin === false && page === 'register' || page === 'login'"
              :class="{'bg-info': page === 'register'}"
              @click.prevent = "pageChanger('register')"
              >Register</a>

              <a class="nav-link active" href="#" id="nav-login" 
              v-if="isLogin === false && page === 'register' || page === 'login'"
              :class="{'bg-info': page === 'login'}"
              @click.prevent = "pageChanger('login')"
              >Login</a>

              <a class="nav-link active" href="#" id="nav-home" 
              v-if="isLogin === true"
              :class="{'bg-info': page === 'home'}"
              @click.prevent = "pageChanger('home')"
              >Home</a>

              <a class="nav-link active" href="#" id="nav-task" 
              v-if="isLogin === true"
              :class="{'bg-info': page === 'addTask'}"
              @click.prevent = "pageChanger('addTask')"
              >New Task</a>

              <a class="nav-link active" href="#" id="nav-logout" 
              v-if="isLogin === true"
              :class="{'bg-info': page === 'logout'}"
              @click.prevent = "loggingOut"
              >Logout</a>

            </div>
          </div>
        </div>
    </nav>

  <register v-if="isLogin === false && page === 'register'" @emitpageChanger="pageChanger"></register>
  <login v-else-if="isLogin === false && page === 'login'" @emitpageChanger2="pageChanger"></login>
  <home v-if="isLogin === true && page === 'home'" 
  :taskData="taskData"
  @taskDelete="taskDelete"
  @changeCategory="changeCategory"
  @taskEdit='taskEdit'
  ></home>
  <addTask v-if="isLogin === true && page === 'addTask'"
  :addError='addError'
  @addTask="addTask"></addTask>
  <editTask v-if="isLogin === true && page === 'edit'" :data="taskDataEdit"
  :editError='editError'
  @editTask="editTask"></editTask>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import home from "./views/home"
import login from "./views/login"
import register from './views/register.vue'
import addTask from './views/addTask.vue';
import editTask from './views/editTask';
import axios from 'axios'
export default {
    data() {
        return {
            isLogin: false,
            page: "register",
            user: '',
            editError: [],
            addError: [],
            taskData: [],
            taskDataEdit: {}
        }
    },
    components: {
        home,
        login,
        register,
        addTask,
        editTask


    },
    methods: {
        pageChanger(page){
            this.editError = []
            this.addError = []
            if (localStorage.getItem("access_token")){
                this.getData()
                this.isLogin = true
                this.page = page
            } else {
                this.isLogin = false
                this.page = page
            }
        },
        loggingOut() {
          localStorage.clear()
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut()
          .then(function () {
            console.log('User signed out.');
          });
          this.isLogin = 'false'
          this.page = 'login'
          this.pageChanger(this.page)
        },
        getData() {
          axios({
            method: "GET",
            url: "https://fancy-kanban-suryo.herokuapp.com/tasks",
            headers: {
              access_token: localStorage.access_token
            }
          })
          .then(response => {
            this.taskData = response.data
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            }
          })
        },
        authenticate () {
          if(localStorage.access_token){
          this.isLogin = true
          this.page = 'home'
          } else{
              this.isLogin = false
              this.page = 'login'
          }
        },
        taskDelete (taskId) {
          axios({
            url: `https://fancy-kanban-suryo.herokuapp.com/tasks/${taskId}`,
            method: 'delete',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then(response => {
            console.log(response);
            this.getData()
          })
          .catch((error) => {
            console.log(error.response.data);
          })
        },
        changeCategory(payload) {
           axios({
            url: `https://fancy-kanban-suryo.herokuapp.com/tasks/${payload.id}`,
            method: 'patch',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              category: payload.category
            }
          })
          .then(response => {
            this.getData()
          })
          .catch((error) => {
            console.log(error.response.data);
          })
        },
        taskEdit (taskId) {
          axios({
            url: `https://fancy-kanban-suryo.herokuapp.com/tasks/${taskId}`,
            method: 'get',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then(response => {
            this.taskDataEdit = response.data
            this.page = 'edit'
            
          })
          .catch((error) => {
            console.log(error.response.data);
          })
        },
        editTask (payload) {
          axios({
            url: `https://fancy-kanban-suryo.herokuapp.com/tasks/${payload.id}`,
            method: 'put',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              title: payload.title,
              category: payload.category
            }
          })
          .then(() => {
            this.getData()
            this.page = 'home'
            
          })
          .catch((error) => {
             let err = error.response.data.message
            this.editError = ''
            if(Array.isArray(err)){
              for (let a = 0; a < err.length; a++) {
                this.editError += err[a]
                if (a+1 !== err.length) {
                  this.editError += ", "
                } else {
                  this.editError += "."
                }
              }
            } else {
              this.editError = error
            }
          })
        },
        addTask (payload) {
          axios({
            url: `https://fancy-kanban-suryo.herokuapp.com/tasks`,
            method: 'post',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              title: payload.title,
              category: payload.category
            }
          })
          .then(() => {
            this.addError = ''
            this.getData()
            this.page = 'home'
            
          })
          .catch((error) => {
            let err = error.response.data.message
            this.addError = ''
            if(Array.isArray(err)){
            for (let a = 0; a < err.length; a++) {
              this.addError += err[a]
              if (a+1 !== err.length) {
                this.addError += ", "
              } else {
                 this.addError += "."
              }
            }
          } else {
            this.addError = error
          }
          })
        }

    },created() {
      this.authenticate()
      this.getData()
  }
}
</script>
<style>
*{
    padding: 0;
    margin: 0;
}

.container-fluid {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.container-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    height: 700px;
    max-height: 900px;
    width: 400px;
    overflow-x: hidden;
}

#main-body {
    background-color:#d1ccc0;
}

.form-control {
    width: 300px;
}
.box {
    display: flex;
    justify-content: center;
}
</style>