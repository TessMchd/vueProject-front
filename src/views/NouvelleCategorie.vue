<template>
  <div class="about">
    <b-card class="mt-3 mx-5" :header="this.$route.params.categorie ? 'Modifier une catégorie | ' +  this.$route.params.categorie.titre : 'Créer une catégorie'">
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
            id="couleur"
            label="Couleur"
            label-for="couleur"
        >
          <b-form-input
              id="couleur"
              v-model="couleur"
              type ="text"
              placeholder="Couleur"
              required
          ></b-form-input>
        </b-form-group>
        <div>
          <b-button v-if="this.$route.params.categorie" class="green-button mt-4" @click="modifierCategorie">
            Modifier
          </b-button>
          <b-button v-else class="green-button mt-4" @click="ajoutCategorie">
            Ajouter
          </b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import {postCategorie, updateCategorie} from '../api/categorie'
export default {
  name: 'NouvellesCategorie',
  data () {
    return {
      couleur: this.$route.params.categorie ? this.$route.params.categorie.couleur : '',
      titre: this.$route.params.categorie ? this.$route.params.categorie.titre : '',
      confirm: false
    }
  },
  methods: {
    async ajoutCategorie() {
      await postCategorie({
        couleur: this.couleur,
        titre: this.titre
      }).then((reponse) => {
        console.log(reponse)
        //this.confirm = true //activation d'un bandeau de confirmation
        this.$router.push('/categories') //redirection
      })
    },
    async modifierCategorie() {
      await updateCategorie({
        couleur: this.couleur,
        titre: this.titre
      }, this.$route.params.categorie.id).then((reponse) => {
        console.log(reponse)
        //this.confirm = true //activation d'un bandeau de confirmation
        this.$router.push('/categories') //redirection
      })
    }
  }
}
</script>