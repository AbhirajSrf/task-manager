<script setup>
defineProps({ task: { type: Object, required: true } });
defineEmits(["toggle", "delete"]);
</script>

<template>
  <li class="task" :class="{ done: task.completed }">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="$emit('toggle', task)"
    />
    <div class="info">
      <strong>{{ task.title }}</strong>
      <p v-if="task.description">{{ task.description }}</p>
    </div>
    <div class="actions">
      <RouterLink :to="`/tasks/${task.id}edit`">Edit</RouterLink>
      <button @click="$emit('delete', task)">Delete</button>
    </div>
  </li>
</template>
