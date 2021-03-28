<template>
  <div class="container-fluid">
      <category v-for="(category, index) in categoryData" 
      :key="index" 
      :category="category"
      :taskData='taskData'
      @taskDelete="taskDelete"
      @changeCategory="changeCategory"
      @taskEdit='taskEdit'></category>
  </div>
</template>

<script>
import category from '../components/category'
export default {
    components: {
        category
    },
    data() {
        return {
            categoryData: ['Backlog', 'Todo', 'Doing', 'Done']
        }
    },
    props: ['taskData'],
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
    }
}
</script>

<style>

</style>