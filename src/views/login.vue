<template>
 <div class="pt-5 container d-flex align-items-center justify-content-center">
   <b-card class="mt-3 mx-5" header="Connexion" id="connexion">
     <b-form>
       <b-form-group
           id="email"
           label="Email"
           label-for="email"
       >
         <b-form-input
             id="email"
             v-model="email"
             type="text"
             placeholder="email@email.com"
             required
         ></b-form-input>
       </b-form-group>
       <b-form-group
           class="mt-3"
           id="password"
           label="Mot de passe"
           label-for="password"
       >
         <b-form-input
             type="password"
             id="password"
             v-model="password"
             placeholder="Mot de passe"
             required
         ></b-form-input>
       </b-form-group>
       <div>
         <b-button class="green-button mt-4" @click="login">
          Se connecter
         </b-button>
       </div>
     </b-form>
   </b-card>
 </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data () {
    return {
      email: null,
      password : null
    }
  },
  methods : {
    async login() {
        axios.post('http://localhost/symfony-vue/public/index.php/authentication_token', {
          email : this.email,
          password : this.password
        }).then((resp) => {
              const token = resp.data.token
              const userData = atob(resp.data.token.split('.')[1]) //on récupère les données de l'utilisateur, par défaut, login, rôles
              localStorage.setItem('user', userData) // store the user in localstorage
              localStorage.setItem('usertoken', token) // store the token in localstorage
              this.$router.push({name : "Home"})
            }
        ).catch(()=> {
          console.log('nonono')
          localStorage.removeItem('usertoken') // if the request fails, remove any possible user token if possible
        })
    }
  }
}
</script>

<style scoped>

</style>