<template>
 <div>
   <b-list-group class="p-5">
     <b-list-group-item class="flex-column align-items-start p-4">
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
 </div>
</template>

<script>
import {getMessage, deleteMessage} from "../api/message";

export default {
  name: "MessageVoir",
  data() {
    return {
      message : null
    }
  },
  watch : {
    $route() {
      this.actualiseMessage()
    }
  },
  async mounted() {
    this.actualiseMessage()
  },
  methods: {
    async actualiseMessage() {
      this.message = await getMessage(this.$route.params.id).then((response) => {
        return response.data
      })
    },
    async supprimerMessage(id) {
      await deleteMessage(id).then(() => this.$router.push('/categories/' + this.message.id))
    }
  }
}
</script>

<style scoped>

</style>