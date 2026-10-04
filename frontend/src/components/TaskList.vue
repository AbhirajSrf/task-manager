<script setup>
import { ref, onMounted } from "vue";
import api from "../api";
import TaskItem from "./TaskItem.vue";

const tasks = ref([]);
const loading = ref(true);
const error = ref("");

async function fetchTasks(params) {
  try {
    const { data } = await api.get("/tasks");
    tasks.value = data;
  } catch (e) {
    error.value = "Failed to load tasks.";
  } finally {
    loading.value = false;
  }
}

async function toogleTask(task) {
  try {
    const { data } = await api.put(`/tasks/${task.id}`, {
      completed: !task.completed,
    });
    const i = tasks.value.findIndex((t) => t.id === task.id);
    tasks.value[i] = data;
  } catch (e) {
    error.value = "Could not update task.";
  }
}

onMounted(fetchTasks);
</script>

<template>
  <p v-if="loading">Loading...</p>
  <p v-else-if="error" class="error">{{ error }}</p>
  <p v-else-if="tasks.length === 0">No tasks yet. Create One!</p>
  <ul v-else class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleTask"
      @delete="deleteTask"
    />
  </ul>
</template>
