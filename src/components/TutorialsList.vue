<template>
<div class="list row">
   <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Başlığa göre ara"
        v-model="aranacakKelime"
          />
        <div class="input-group-append">
          <button class="btn btn-success" type="button" @click="basligaGoreAra"
          >
            Ara
          </button>

          <button class="btn btn-success" type="button" @click="refresh"
          >
            Yenile
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
        <h4>Tutorial Listesi </h4>
        <ul>
        <li class="list-group-item" 
        v-for="(tutorial,index) in tutorials" :key="index"
         :class="{ active: index == guncelIndex }"
         @click="aktifTutorial(tutorial,index)"
        >
        {{tutorial.title}} - {{tutorial.description}}
        </li>
        </ul>
    </div>
    <div class="col-md-6">
      <div v-if="guncelTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ guncelTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ guncelTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> 
          {{ guncelTutorial.published ? "Yayınlandı" : "Yayına Hazırlanıyor..." }}
        </div>

        <router-link :to="'/tutorials/' + guncelTutorial.id" 
        class="badge badge-warning">Düzenle</router-link>
      </div>
      <div v-else>
        <br />
        <p></p>
      </div>
    </div>
</div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService"
export default {
    name : "tutorials-list",
    data(){
    return {
       tutorials : [],
       guncelTutorial : null,
       guncelIndex : -1,
       aranacakKelime : ''
    };
    },
    methods: 
    {
        //http://85.159.71.66:8080/api/tutorials
        tutoriallariGetir() {
        TutorialDataService.getAllTutorials().then(gelenTutorials => {
                this.tutorials = gelenTutorials.data
                console.log(gelenTutorials.data)
        })
        .catch(hata => {
            console.log(hata);
        })
        },
      aktifTutorial(tutorial,index)
       {
         this.guncelTutorial = tutorial;
         this.guncelIndex = index;
       },

       basligaGoreAra() {
        TutorialDataService.findByTitle(this.aranacakKelime)
        .then(aramaSonucuGelenTutorials=> {
            this.tutorials = aramaSonucuGelenTutorials.data;
        }).catch(hata => {
          console.log("hata oluştu :" +hata);
        });
       },
       refresh()
       {
        this.tutoriallariGetir();
       }
    },
    //sayfa çağrıldığında 
    mounted() {
        this.tutoriallariGetir();
    }
};
</script>