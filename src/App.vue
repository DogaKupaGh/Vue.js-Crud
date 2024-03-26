<template>
  <div id="app">
   <nav class="navbar navbar-expand navbar-dark bg-dark">
     <router-link to="/" class="navbar-brand">Vue.js Deneme Crud</router-link>
     <div class="navbar-nav mr-auto">
       <li class="nav-item">
         <router-link to="/tutorials" class="nav-link">Tutorials List </router-link>
       </li>
       <li class="nav-item">
         <router-link to="/ekle" class="nav-link">Tutorial Ekle </router-link>
       </li>
       <li class="nav-item">
        <router-link to="/login" class="nav-link">Login</router-link>
       </li>
     </div>
   </nav>
   <div class="container mt-5">
    <router-view />
   </div>
  </div>
</template>

<script>
export default {
    name : "app"
}
</script>