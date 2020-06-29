<template>
    <div class="row">
      <loader :loading="busy" />

      <card class="col-12" title="Grupos">
          <div class="pb-3">
            
            <button class="btn btn-primary" @click="setGrupos">
              <i class="fa fa-download"></i>
              Carregar
            </button>
            
            <button class="btn btn-primary ml-3">
              <i class="fa fa-file-pdf-o"></i>
              Baixar
            </button>

            <div v-if="groups.length" class="mt-3">
              <i class="fa fa-address-book"></i>
              {{groups.length}}
            </div>

          </div>
      </card>
      <div class="col-12 px-0" v-for="grupo in getGrupos" :key="grupo.user">
        <card class="" >
            <div class="pb-2 card-flex">
              <div class="card-avatar">
                <img v-if="grupo.image" class="card-img-avatar" :src="grupo.image" >
                <img v-else class="card-img-avatar" src="../assets/img/no-img.png" >
              </div>
              <div class="card-content">
                <p>
                  <i class="fa fa-users color-warner"></i>
                  {{grupo.name}}
                </p>
                <p>
                  <i class="fa fa-whatsapp"></i>
                  {{grupo.user}}
                </p>
              </div>
            </div>
            <div class="box-participantes row m-0">
                <p class="col-12">{{grupo.participants.length}} participantes:</p>
                  
                  <div class="col-md-6 col-xl-4" v-for="participante in grupo.participants" :key="participante.user">
                    <div class="card-flex border mb-2" >
                        <div class="card-avatar">
                            <img v-if="participante.image" class="card-img-avatar" :src="participante.image" >
                            <img v-else class="card-img-avatar" src="../assets/img/no-img.png" >
                        </div>
                        <div class="card-content">
                            <p>
                                <i class="fa fa-user"></i>
                                {{participante.pushname}}
                            </p>
                            <p>
                                <i class="fa fa-whatsapp"></i>
                                {{participante.name}}
                            </p>
                            <p v-if="participante.is_my_contact">
                                <i class="fa fa-floppy-o"></i> 
                                Contato da agenda
                            </p>
                            <p v-if="participante.isAdmin" class="text-primary">
                                <i class="fa fa-adn"></i> 
                                administrador
                            </p>
                        </div>
                    </div>
                  </div>
            </div>
        </card>
      </div>
    </div>
</template>

<script>
import { PaperTable, Loader } from "@/components";
import api from "@/services/api"
   
export default {
    name: 'Groups',
    components: {
      PaperTable, Loader
    },
    data() {
      return {
          busy: false,
          groups: []
      };
    },
    computed:{
        getGrupos(){
            return this.groups;
        },
        getTotalGrupos(){
            return `${this.groups.length} Grupos` 
        },
    },
    monted:{
        //
    },
    methods:{
        setGrupos(){
            this.busy = true
            api.get('groups')
                .then((result) => {
                    this.groups = result.data
                })
                .finally(() => {
                    this.busy = false
                })
        }
    }
};
</script>

<style lang="scss">
.card-flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-avatar{
  width: 100px;
}
.card-img-avatar{
  border: 1px #cccccc solid;
  padding: 1px;
  border-radius: 50%;
  width: 100px;
}
.card-content{
  width: calc(100% - 100px);
  padding:  0 8px;
}
.color-warner{
  color: #ff851b;
}
.color-blue{
  color: #0073b7;
}
.card-content p{
  margin: 0;
}
.box-participantes{
    margin: 0;
    width: 100%;
}
.border{
    border: 1px #cccccc solid;
    border-radius: 6px;
    padding: 5px;
}
</style>
