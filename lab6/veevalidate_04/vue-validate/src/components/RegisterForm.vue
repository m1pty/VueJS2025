<template>
  <form @submit.prevent="submitForm" class="register-form">
    <div>
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="email"
        type="email"
        :class="{
          'input-valid': !emailError && email,
          'input-invalid': emailError && email,
        }"
        @blur="validateEmail"
      />
      <span class="error" v-if="emailError">{{ emailError }}</span>
    </div>

    <div>
      <label for="password">Пароль:</label>
      <input
        id="password"
        v-model="password"
        type="password"
        :class="{
          'input-valid': !passwordError && password,
          'input-invalid': passwordError && password,
        }"
        @blur="validatePassword"
      />
      <span class="error" v-if="passwordError">{{ passwordError }}</span>
    </div>

    <div>
      <label>
        <input
          type="checkbox"
          v-model="agreed"
        />
        Я согласен с <a href="#">лицензионным соглашением</a>
      </label>
    </div>

    <button type="submit" :disabled="!isFormValid">Зарегистрироваться</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as yup from 'yup';

const email = ref('');
const password = ref('');
const agreed = ref(false);
const emailError = ref('');
const passwordError = ref('');

const schema = yup.object({
  email: yup.string().required('Email обязателен').email('Неверный формат email'),
  password: yup.string().required('Пароль обязателен').min(8, 'Минимум 8 символов')
            .matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, 'Пароль должен содержать латинские буквы обоих регистров')
            .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 'Пароль должен содержать хотя бы 1 спецсимвол')
            .matches(/^(?=.*[0-9]).+$/, 'Пароль должен содержать хотя бы 1 цифру'),
});

const validateEmail = () => {
  try {
    schema.fields.email.validateSync(email.value);
    emailError.value = '';
  } catch (err) {
    emailError.value = err.message;
  }
};

const validatePassword = () => {
  try {
    schema.fields.password.validateSync(password.value);
    passwordError.value = '';
  } catch (err) {
    passwordError.value = err.message;
  }
};

const isFormValid = computed(() => !emailError.value && !passwordError.value && agreed.value);

const submitForm = () => {
  alert(`Email: ${email.value}\nPassword: ${password.value}`);
};
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
.input-valid {
  border-color: green;
}
.input-invalid {
  border-color: red;
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
