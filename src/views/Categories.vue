<template>
  <div class="about p-3">
    <b-card-group deck>
      <b-card header="Liste des catégories">
        <b-list-group>
          <b-list-group-item v-for="categorie in categories" :key="categorie.id" class="d-flex justify-content-between align-items-center">
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
        </b-list-group>
      </b-card>
    </b-card-group>
    <b-button class="green-button mt-3"><router-link to="/nouvelle-categorie">Nouvelle catégorie</router-link></b-button>
    <router-view></router-view>
  </div>
</template>

<script>
import {getCategories, deleteCategorie} from '../api/categorie'

export default {
  name: 'Categories',
  data () {
    return {
      categories: null
    }
  },
  async mounted () {
    this.categories = await getCategories().then((response) => {
      return response.data['hydra:member']
    })

  },
  methods : {
    async supprimerCategorie(id) {
      await deleteCategorie(id).then(() => this.$router.push('/categories/')).then(() =>
          window.location.reload()
      )
    }
  }
}

</script>
