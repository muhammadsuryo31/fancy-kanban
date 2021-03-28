<template>
<div class="card-body-new">
  <p class="card-text">{{data.title}}</p>
  <p class="card-text-author mt-3" style="color:#B22222">author: {{ data.User.email }}</p>
  <div class="actions">
      <a href="#" class="card-link text-primary" @click.prevent="taskEdit">Edit</a>
      <a href="#" class="card-link text-danger" @click.prevent="taskDelete">Delete</a>
  </div>
  <p>change category:</p>
  <div class="category actions">
      <a href="#" class="card-link text-primary" @click.prevent="changeCategory('Backlog')">Backlog</a>
      <a href="#" class="card-link text-primary" @click.prevent="changeCategory('Todo')">Todo</a>
      <a href="#" class="card-link text-primary" @click.prevent="changeCategory('Doing')">Doing</a>
      <a href="#" class="card-link text-primary" @click.prevent="changeCategory('Done')">Done</a>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props: ['data'],
  methods: {
    taskDelete () {
      this.$emit('taskDelete', this.data.id)
    },
    changeCategory(category) {
      let packageData = {
        id: this.data.id,
        category
      }
      this.$emit('changeCategory', packageData)
    },
    taskEdit() {
      this.$emit('taskEdit', this.data.id)
    }
  }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.card {
    margin-top: 20px;
    width: 400px;
}

.actions {
    display: flex;
    width: auto;
    justify-content: space-evenly;
}

.actions a {
    text-decoration: none;
}

/* .container-fluid {
    display: flex;
    flex-direction: row;
    justify-content: center;
} */

.card-text-title {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
}

.card-header {
    width: 400px;
}

/* .container-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    height: 600px;
    max-height: 900px;
    width: 400px;
} */

.card-body-new{
    background-color: whitesmoke;
    font-family: 'Times New Roman', Times, serif;
    border: 10px;
    height: auto;
    padding: 5px;
    width: 350px;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    max-height: 400px;
}
p {
  margin: 0px;
}
</style>>