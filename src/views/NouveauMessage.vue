<template>
  <div class="p-5">
      <b-card class="mt-3 mx-5" :header="this.$route.params.message ? 'Modifier un message | ' + this.$route.params.categorie.titre : 'Ajouter un message | ' + this.$route.params.categorie.titre ">
        <b-form>
          <b-form-group
              id="titre"
              label="Titre"
              label-for="titre"
          >
            <b-form-input
                id="titre"
                v-model="titre"
                type="text"
                placeholder="Titre"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              class="mt-3"
              id="message"
              label="Message"
              label-for="message"
          >
            <b-form-textarea
                id="message"
                v-model="message"
                placeholder="Entre ton message"
                required
            ></b-form-textarea>
          </b-form-group>
          <div>
            <b-button v-if="this.$route.params.message" class="green-button mt-4" @click="modifierMessage">
              Modifier
            </b-button>
            <b-button v-else class="green-button mt-4" @click="ajoutMessage">Ajouter</b-button>
          </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import {postMessage, updateMessage} from "../api/message";

export default {
  name: "NouveauMessage",
  data () {
    return {
      message: this.$route.params.message ? this.$route.params.message.message : '' ,
      titre: this.$route.params.message ? this.$route.params.message.titre : '' ,
      confirm: false
    }
  },
  methods: {
    async ajoutMessage() {
      await postMessage({
        message: this.message,
        titre: this.titre,
        datePublication : new Date(),
        categorie : '/symfony-vue/public/index.php/api/categories/' + this.$route.params.categorie.id,
      }).then(() => {
        this.$router.push('/categories/'+ this.$route.params.categorie.id) //redirection
      })
    },
    async modifierMessage() {
      await updateMessage({
        message: this.message,
        titre: this.titre,
        categorie : '/symfony-vue/public/index.php/api/categories/' + this.$route.params.categorie.id,
      }, this.$route.params.message.id).then(() => {
        this.$router.push('/categories/' + this.$route.params.categorie.id) //redirection
      })

    }
  }
}
</script>

<style scoped>

</style>