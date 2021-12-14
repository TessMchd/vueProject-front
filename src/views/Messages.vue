<template>
  <div class="about">
    <b-card-group deck class="p-5">
      <b-card header="Liste des messages">
        <b-list-group>
          <b-list-group-item v-for="message in messages" :key="message.id" class="flex-column align-items-start p-4">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-3">{{ message.titre }} | {{message.categorie.titre}}</h5>
              <small>{{ new Date(message.datePublication).toLocaleDateString() + ' ' + new Date(message.datePublication).toLocaleTimeString() }}</small>
            </div>

            <p class="mb-1 message-content">
              {{ message.message }}
            </p>
            <small class="float-lg-end"><router-link :to="{name:'voir_message', params: {id: message.id}}">
              Voir le message
            </router-link></small>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import{getMessages} from "../api/message";

export default {
  name:'Messages',
  data() {
    return {
      messages : null
    }
  },
  async mounted () {
    this.messages = await getMessages().then((response) => {
      return response.data['hydra:member']
    })
  }
}

</script>
