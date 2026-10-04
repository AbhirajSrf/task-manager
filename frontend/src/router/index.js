import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "tasks", component: TaskList },
    { path: "/tasks/create", name: "task-create", component: TaskForm },
    { path: "/tasks/:id/edit", name: "task-edit", component: TaskForm },
  ],
});

export default router;
