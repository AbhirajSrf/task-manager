<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const form = ref({ title: "", description: "", completed: false });
const errors = ref({});
const saving = ref(false);

onMounted(async () => {
  if (isEdit.value) {
    const { data } = await api.get(`/tasks/${route.params.id}`);
    form.value = {
      title: data.title,
      description: data.description ?? "",
      completed: data.completed,
    };
  }
});

async function submit() {
  saving.value = true;
  errors.value = {};
  try {
    if (isEdit.value) {
      await api.put(`/tasks/${route.params.id}`, form.value);
    } else {
      await api.post("/tasks", form.value);
    }
    router.push("/");
  } catch (e) {
    if (e.response?.status === 422) {
      errors.value = e.response.data.errors;
    }
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2>{{ isEdit ? "Edit Task" : "New Task" }}</h2>

    <label>
      Title
      <input v-model="form.title" type="text" />
    </label>
    <small v-if="errors.title" class="error">{{ errors.title[0] }}</small>

    <label>
      Description
      <textarea v-model="form.description" rows="3"></textarea>
    </label>

    <label class="check">
      <input v-model="form.completed" type="checkbox" />
      Completed
    </label>

    <button type="submit" :disabled="saving">
      {{ saving ? "Saving ..." : "Save" }}
    </button>
  </form>
</template>
