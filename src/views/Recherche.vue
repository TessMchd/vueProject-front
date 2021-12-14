<template>
  <div class="p-5">
    <b-card class="mt-3 mx-5 d-flex">
      <b-form class="d-flex justify-content-between">
        <div class="d-flex align-items-center"><h4 class="mb-0 pb-0 d-flex align-items-center">Recherche</h4></div>
        <div class="d-flex recherche-card ">
            <b-form-input
                id="recherche"
                v-model="recherche"
                type="text"
                placeholder="Rechercher"
                required>
            </b-form-input>
          <div>
            <b-button class="green-button" @click="search">Rechercher</b-button>
          </div>
        </div>
      </b-form>
    </b-card>
    <b-list-group class="p-5" v-if="result">
      <b-card class="mt-3 d-flex" header="Résultats pour les catégories">
      <b-list-group-item v-for="categorie in JSON.parse(result.categories)" :key="categorie.id" class="d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <div class="categorie d-flex align-items-center" >
            <router-link :to="{name:'categorie_messages', params: {id: categorie.id}}">
              {{categorie.titre}}
            </router-link>
          </div>
          <b-badge class="mx-4 my-2" variant="primary" pill>{{categorie.messages.length}}</b-badge>
        </div>
        <div>
          <router-link  :to="{name:'nouvelle-categorie', params: {categorie : categorie}}">modifier</router-link>
          <a class="mx-2 cursor" @click="supprimerCategorie(categorie.id)">supprimer</a>
        </div>
      </b-list-group-item>
      </b-card>
      <b-card class="mt-3 d-flex" header="Résultats pour les messages">
        <b-list-group>
          <b-list-group-item v-for="message in  JSON.parse(result.messages)" :key="message.id" class="flex-column align-items-start p-4">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-3">{{ message.titre }} | {{message.categorie.titre}}</h5>
              <small>{{ new Date(message.datePublication).toLocaleDateString() + ' ' + new Date(message.datePublication).toLocaleTimeString() }}</small>
            </div>

            <p class="mb-1 message-content">
              {{ message.message }}
            </p>
            <small class="float-lg-end">
              <router-link :to="{name:'nouveau-message', params: {categorie : message.categorie, message : message}}">modifier</router-link>
              <a class="mx-2 cursor" @click="supprimerMessage(message.id)">supprimer</a>
            </small>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-list-group>
  </div>
</template>
<script>

import axios from "axios";
import {deleteCategorie} from "../api/categorie";
import {deleteMessage} from "../api/message";

export default {
  name: "NouveauMessage",
  data () {
    return {
      recherche:'',
      result: null
    }
  },
  methods: {
    async search() {
      await axios.get('http://localhost/symfony-vue/public/index.php/api/functions/recherche/' + this.recherche, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('usertoken')
        }}).then((response) => {
        this.result = response.data
      })
    },
    async supprimerCategorie(id) {
      await deleteCategorie(id).then(() => this.$router.push('/categories/')).then(() =>
          window.location.reload()
      )
    },
    async supprimerMessage(id) {
      await deleteMessage(id).then(() => this.$router.push('/categories/' + this.message.id))
    }
  }
}

</script>
