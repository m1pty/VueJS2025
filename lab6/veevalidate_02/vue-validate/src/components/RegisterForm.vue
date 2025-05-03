<template>
  <form @submit.prevent="submitForm" class="register-form">
    <div>
      <label for="email">Email:</label>
      <input 
        id="email" 
        v-model="email" 
        type="email" 
        :class="{ 'valid': isEmailValid, 'invalid': emailError }" 
      />
      <span class="error" v-if="emailError">{{ emailError }}</span>
    </div>

    <div>
      <label for="password">Пароль:</label>
      <input 
        id="password" 
        v-model="password" 
        type="password" 
        :class="{ 'valid': isPasswordValid, 'invalid': passwordError }" 
      />
      <span class="error" v-if="passwordError">{{ passwordError }}</span>
    </div>

    <button type="submit" :disabled="!isFormValid">Зарегистрироваться</button>
  </form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { computed } from 'vue';

// Определение схемы валидации с помощью Yup
const schema = yup.object({
  email: yup.string().required('Email обязателен').email('Неверный формат email'),
  password: yup.string().required('Пароль обязателен').min(8, 'Минимум 8 символов'),
});

// Инициализация формы с использованием схемы валидации
const { handleSubmit } = useForm({
  validationSchema: schema,
});

// Определение полей формы
const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email');
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password');

// Вычисляемые свойства для определения валидности полей
const isEmailValid = computed(() => {
  return emailMeta.validated && emailMeta.valid && email.value;
});

const isPasswordValid = computed(() => {
  return passwordMeta.validated && passwordMeta.valid && password.value;
});

// Вычисляемое свойство для определения валидности формы
const isFormValid = computed(() => {
  return !emailError.value && !passwordError.value && email.value && password.value;
});

// Обработчик отправки формы
const submitForm = handleSubmit((values) => {
  alert(`Email: ${values.email}\nPassword: ${values.password}`);
});
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  font-weight: bold;
}
input {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}
input:focus {
  outline: none;
  border-color: #42b983;
}
input.valid {
  border-color: #42b983;
}
input.invalid {
  border-color: #ff4444;
}
.error {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
button {
  padding: 0.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background: #3aa876;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>