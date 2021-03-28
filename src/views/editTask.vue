<template>
    <main class="container my-5">
        <div class="row" id="row">
          <section class="col login-col">
            <div class="card shadow p-5" id="main-body-login">
              <form @submit.prevent="editKanban">
                <h3 class="text-center text-uppercase mb-4">Edit Task</h3>
                <p style="color: red" v-if="editError.length > 0"> {{ editError }} </p>
                <hr>
                <div class="form-group">
                  <label>title</label>
                  <input type="text" placeholder="Name" class="form-control" v-model="data.title">
                </div>
                <div class="form-group">
                  <label>Category</label>
                  <select id="select-edit" name="phase-group" class="dropdown-toogle" v-model="data.category">
                    <option value="Backlog">Backlog</option>
                    <option value="Todo">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div>
                    <button id="button-edit" type="submit" class="btn btn-block btn-secondary rounded-pill mt-3 actions">Submit</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
</template>

<script>
export default {
  props: ['data', 'editError'],
  methods: {
    editKanban () {
      const newData = {
        id: this.data.id,
        title: this.data.title,
        category: this.data.category
      }
      this.$emit('editTask', newData)
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
  #select-edit {
    width: 302px;
  }

  #button-edit {
    width: 302px;
  }
</style>>
