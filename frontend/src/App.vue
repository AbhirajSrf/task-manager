<script setup></script>

<template>
  <div>
    <header>
      <h1>Task Manager</h1>
      <nav>
        <RouterLink to="/">Tasks</RouterLink>
        <RouterLink to="/tasks/create">New Task</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>
