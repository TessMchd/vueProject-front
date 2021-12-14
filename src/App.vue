<template>
  <div id="app">
    <b-card-header v-if="token" header-tag="nav" id="nav">
      <b-nav class="d-flex justify-content-between">
        <div class="d-flex">
          <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
          <b-nav-item><router-link to="/categories">Catégories</router-link></b-nav-item>
          <b-nav-item><router-link to="/messages">Messages</router-link></b-nav-item>
          <b-nav-item><router-link to="/recherche">Recherche</router-link></b-nav-item>
          <b-nav-item><router-link to="/a-propos">About</router-link></b-nav-item>
        </div>
        <div class="d-flex align-items-center">
          <a class="m-0 p-0 cursor" @click="logout">Déconnexion</a>
        </div>
      </b-nav>
    </b-card-header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      token : localStorage.getItem('usertoken')
    }
  },
  updated() {
    this.token = localStorage.getItem('usertoken')
  },
  computed: {

  },
  methods : {
    logout() {
      localStorage.removeItem('usertoken')
      this.$router.push('login')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
