<template>
    <div id="app" class="container d-flex justify-content-center">
      <div class="col-sm-5">
        <div class="card">
          <div class="card-header">Kullanıcı Oluştur</div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="username">Kullanıcı Adı</label>
                <input type="text" class="form-control" v-model="formData.username" maxlength="10" placeholder="kullanıcı adını yazınız">
                <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
              </div>
              <div class="form-group">
                <label for="email">E-posta</label>
                <input type="email" class="form-control" v-model="formData.email" placeholder="emailinizi yazınız">
                <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
              </div>
              <div class="form-group">
                <label for="password">Şifre</label>
                <input type="password" class="form-control" v-model="formData.password" placeholder="şifrenizi yazınız">
                <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
              </div>
              <div class="form-group">
                <label for="repassword">Şifre Tekrar</label>
                <input type="password" class="form-control" v-model="formData.repassword" placeholder="şifrenizi tekrar yazınız">
                <div v-if="errors.repassword" class="invalid-feedback">{{ errors.repassword }}</div>
              </div>
              <div class="form-group">
                <label for="phone">Telefon Numarası</label>
                <input type="text" class="form-control" v-model="formData.phone" placeholder="telefon numarası yazınız" @input="formatPhoneNumber">
                <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
              </div>
              <button type="submit" class="btn btn-success w-100">Kayıt Ol</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  
  export default {
    name: 'LoginValidation',
    setup() {
      const formData = reactive({
        username: '',
        email: '',
        password: '',
        repassword: '',
        phone: ''
      });
  
      const errors = ref({});
  
      const submitForm = () => {
        errors.value = {};
        checkRequired(['username', 'email', 'password', 'repassword', 'phone']);
        checkLength('username', 6, 10);
        emailCheck('email');
        checkPasswords();
        checkPhone();
      };
  
      const checkRequired = (fields) => {
        fields.forEach(field => {
          if (!formData[field]) {
            errors.value[field] = `${field} alanı boş bırakılamaz.`;
          }
        });
      };
  
      const checkLength = (field, min, max) => {
        if (formData[field].length < min || formData[field].length > max) {
          errors.value[field] = `${field} en az ${min} en fazla ${max} karakter olmalıdır.`;
        }
      };
  
      const emailCheck = (field) => {
        const emailControl = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailControl.test(formData[field])) {
          errors.value[field] = 'Geçersiz bir e-posta adresi girdiniz.';
        }
      };
  
      const checkPasswords = () => {
        if (!formData.password || !formData.repassword) {
          errors.value.repassword = 'Lütfen her iki şifreyi de girin.';
        } else if (formData.password !== formData.repassword) {
          errors.value.repassword = 'Parolalar eşleşmiyor.';
        } else {
          errors.value.repassword = null;
        }
      };
  
      const formatPhoneNumber = () => {
        formData.phone = formData.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/).slice(1).join(' ');
      };
  
      const checkPhone = () => {
        if (!formData.phone) {
          errors.value.phone = 'Telefon numarası girmelisiniz.';
        } else {
          const phoneControl = /^(\+)?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
          if (!phoneControl.test(formData.phone)) {
            errors.value.phone = 'Telefon numarası geçersiz.';
          } else {
            errors.value.phone = null;
          }
        }
      };
  
      return {
        formData,
        errors,
        submitForm,
        formatPhoneNumber
      };
    }
  };
  </script>
  