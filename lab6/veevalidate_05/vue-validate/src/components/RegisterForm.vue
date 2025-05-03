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
        @input="validatePassword"
      />
      <div v-if="password" class="password-strength">
        <ul>
          <li :class="{ valid: passwordLength }">Длина не менее 8</li>
          <li :class="{ valid: containsNumber }">Цифры</li>
          <li :class="{ valid: containsLowerCase }">Буквы нижнего регистра</li>
          <li :class="{ valid: containsUpperCase }">Буквы верхнего регистра</li>
          <li :class="{ valid: containsSpecialChar }">Спецсимволы</li>
        </ul>
      </div>
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

const email = ref('');
const password = ref('');
const agreed = ref(false);
const emailError = ref('');
const passwordError = ref('');

const passwordLength = computed(() => password.value.length >= 8);
const containsNumber = computed(() => /\d/.test(password.value));
const containsLowerCase = computed(() => /[a-z]/.test(password.value));
const containsUpperCase = computed(() => /[A-Z]/.test(password.value));
const containsSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value));

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  emailError.value = emailPattern.test(email.value) ? '' : 'Неверный формат email';
};

const validatePassword = () => {
  if (!passwordLength.value) {
    passwordError.value = 'Пароль должен содержать не менее 8 символов';
  } else if (!containsNumber.value) {
    passwordError.value = 'Пароль должен содержать хотя бы 1 цифру';
  } else if (!containsLowerCase.value) {
    passwordError.value = 'Пароль должен содержать хотя бы 1 букву нижнего регистра';
  } else if (!containsUpperCase.value) {
    passwordError.value = 'Пароль должен содержать хотя бы 1 букву верхнего регистра';
  } else if (!containsSpecialChar.value) {
    passwordError.value = 'Пароль должен содержать хотя бы 1 спецсимвол';
  } else {
    passwordError.value = '';
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
.password-strength {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
.password-strength ul {
  list-style-type: none;
  padding-left: 0;
}
.password-strength li {
  color: red;
}
.password-strength li.valid {
  color: green;
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
