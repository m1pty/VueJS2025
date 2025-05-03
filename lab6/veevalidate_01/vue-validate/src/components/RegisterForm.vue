<template>
    <form @submit.prevent="submitForm" class="register-form">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" />
        <span class="error" v-if="emailError">{{ emailError }}</span>
      </div>
  
      <div>
        <label for="password">Пароль:</label>
        <input id="password" v-model="password" type="password" />
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
  const { value: email, errorMessage: emailError } = useField('email');
  const { value: password, errorMessage: passwordError } = useField('password');
  
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
  }
  .error {
    color: red;
    font-size: 0.875rem;
  }
  button {
    padding: 0.5rem;
    background: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  </style>
  