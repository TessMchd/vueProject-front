<template>
  <div class="about">
    <b-list-group class="p-5">
      <div class="categorie-title d-flex justify-content-between align-items-center mb-2"  :class="'bg-' + categorie.couleur">
        <h3 class="pb-0 mb-0">{{ categorie.titre }}</h3>
        <b-button class="green-button"><router-link :to="{name:'nouveau-message', params: {categorie : categorie}}">Nouveau message</router-link></b-button>
      </div>
      <b-list-group-item v-for="message in categorie.messages" :key="message.id" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ message.titre }}</h5>
          <small>{{ new Date(message.datePublication).toLocaleDateString() + ' ' + new Date(message.datePublication).toLocaleTimeString() }}</small>
        </div>

        <p class="mb-1 message-content limit-text">
          {{ message.message }}
        </p>

        <small class="float-lg-end"><router-link :to="{name:'voir_message', params: {id: message.id}}">
          Voir le message
        </router-link></small>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import {getCategorie} from '../api/categorie'
export default {
  name: 'CategoriesMessages',
  data () {
    return {
      categorie: {}
    }
  },
  watch: {
    $route () {
      this.actualiseCategorie()
    }
  },
  async mounted () {
    this.actualiseCategorie()
  },
  methods: {
    async actualiseCategorie () {
      this.categorie = await getCategorie(this.$route.params.id).then((response) => {
        return response.data
      })
    }
  }
}
</script>
