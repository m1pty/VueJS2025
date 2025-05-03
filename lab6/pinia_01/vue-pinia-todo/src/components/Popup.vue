<template>
  <teleport to="body">
    <div v-if="modelValue" class="popup-overlay" @click.self="close">
      <div class="popup-content">
        <slot />
        <div class="popup-actions">
          <button @click="confirm">Да</button>
          <button @click="close">Нет</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue', 'confirm']);

function close() {
  emit('update:modelValue', false);
}

function confirm() {
  emit('confirm');
  close();
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 90%;
  text-align: center;
}
.popup-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
button {
  padding: 0.5rem 1rem;
}
</style>
