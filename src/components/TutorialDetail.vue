<template>
    <div v-if="guncellenecekTutorial" class="submit-form">
        <div class="form-group">
            <label for="title" >Başlık : </label>
            <input type="text" 
            class="form-control"
             id="title" required 
             v-model="guncellenecekTutorial.title"
             name="title" />
        </div>
        <div class="form-group">
            <label for="description" >Açıklama : </label>
            <input type="text" 
            class="form-control"
             id="description" 
              v-model="guncellenecekTutorial.description"
            required name="description" />
        </div>
        <br />
        <button class="btn btn-success" @click="tutorialGuncelle">Güncelle </button>
         <button class="btn btn-danger" @click="tutorialSil" onclick="return confirm('silmek istediğinizden emin misiniz?');">Sil </button>
    </div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService"
export default {
    name : "tutorial-detail",
    data(){
        return{
            guncellenecekTutorial : null,
        }
    },
    methods: {
      tutorialDetayGetir(id){
        TutorialDataService.getTutorialDetail(id).then(gelenTutorial => {
            //{"id":id,"title":"testtest","description":"testtestdesc","published":false}
            this.guncellenecekTutorial = gelenTutorial.data;
        })
      },
      tutorialGuncelle()
      {
        console.log("guncellenecek tutorial id: "+this.guncellenecekTutorial.id);
        console.log("guncellenecek tutorial data: "+this.guncellenecekTutorial);
        TutorialDataService.updateTutorial(this.guncellenecekTutorial.id,this.guncellenecekTutorial)
        .then(guncellenmisTutorial => {
            console.log(guncellenmisTutorial.data);
              this.$router.push({ name: "tutorials" });
        }).catch(hata => {
            console.log("hata oluştu : " +hata);
        });
      },

      tutorialSil()
      {
        {
        if(confirm("Silmek istediğinizden emin misiniz?") == true){
            TutorialDataService.deleteTutorial(this.guncellenecekTutorial.id)
            .then(response => {
            console.log(response);
            this.$router.push({ name: "tutorials" });
        });
        }else{
            console.log("Silme gerçekleşmedi")
        }

    }
      }
    },
    mounted() {
        //bana bir önceki yani tutoriaListteki tıklamış olduğum tutorial ın id si gelecek
        this.tutorialDetayGetir(this.$route.params.id);
    }
    
}
</script>