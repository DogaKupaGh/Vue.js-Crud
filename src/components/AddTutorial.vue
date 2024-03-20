<template>
    <div class="submit-form">
        <div class="form-group">
            <label for="title" >Başlık : </label>
            <input type="text" 
            class="form-control"
             id="title" required 
             v-model="kaydedilecekTutorial.title"
             name="title" />
        </div>
        <div class="form-group">
            <label for="description" >Açıklama : </label>
            <input type="text" 
            class="form-control"
             id="description" 
              v-model="kaydedilecekTutorial.description"
            required name="description" />
        </div>
        <br />
        <button class="btn btn-success" @click="tutorialKaydet">Kaydet </button>
         <button class="btn btn-danger" @click="tutorialVazgec">Vazgeç </button>
    </div>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService"
export default {
    name : "add-tutorial",
    data() {
        return{
            kaydedilecekTutorial : {
                title : "",
                description : ""
            }
        }
    },
    methods : {
       tutorialKaydet() {
        //{"title":"vue-bootcamp-1","description":"vue-bootcamp-description"}
        var yeniTutorial = {
           title : this.kaydedilecekTutorial.title,
           description : this.kaydedilecekTutorial.description
        }
        TutorialDataService.createTutorial(yeniTutorial).then(kaydedilmisTutorial => {
            console.log(kaydedilmisTutorial.data);
             this.$router.push({ name: "tutorials" });
        }).catch(hata => {
            console.log("oluşan hata : " +hata);
        })
        console.log("butona tıklandı");

       },
       tutorialVazgec() {
        this.$router.push({ name: "tutorials" });
       }
    }
}
</script>