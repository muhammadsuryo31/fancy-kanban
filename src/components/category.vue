<template>
  <div class="box col-3 mt-5" >
    <div class="card" :id="category">
      <div class="card-header">
        <p class="card-text-title">{{ category }}</p>
      </div>
      <div class="container-body" id="backlog-card-container">
        <Task v-for="task in taskByCategory" :key="task.id" :data="task"
        @taskDelete='taskDelete'
        @changeCategory='changeCategory'
        @taskEdit='taskEdit'></Task>
      <div>
    </div>
  </div>
</template>

<script>
import Task from '../components/Task'
export default {
  data() {
    return{
    }
  },
  components: {
    Task
  },
  props: ['category',
  'taskData'],
  methods: {
    taskDelete (taskId) {
      this.$emit('taskDelete', taskId)
    },
    changeCategory(payload) {
      this.$emit('changeCategory', payload)
    },
    taskEdit (taskId) {
      this.$emit('taskEdit', taskId)
    }
  },
  computed: {
    taskByCategory(){
      let tasks = this.taskData
      let newTasks = []
      tasks.forEach(element => {
        if (element.category == this.category) {
          newTasks.push(element)
        }
      });
      return newTasks
    }
  }
}
</script>

<style>
*{
    padding: 0;
    margin: 0;
}

.card {
    margin-top: 20px;
    width: 400px;
}

.card-text-title {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
}

#Backlog{
    background-color: #f53b57;
}

#Todo{
    background-color: #00d8d6;
}

#Doing{
    background-color: #ffa801;
}

#Done{
    background-color: #808e9b;
}


</style>