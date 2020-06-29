<template>
    <div class="row">
      <loader :loading="busy" />

      <card class="col-12" title="Contatos">
          <div class="pb-3">
            
            <button class="btn btn-primary" @click="setContatos">
              <i class="fa fa-download"></i>
              Carregar
            </button>
            
            <button class="btn btn-primary ml-3" @click="onReport" >
              <i class="fa fa-file-pdf-o"></i>
              Baixar
            </button>

            <div v-if="contacts.length" class="mt-3">
              <i class="fa fa-address-book"></i>
              {{contacts.length}}
            </div>

          </div>
      </card>
      <div class="col-md-6 col-xl-4" v-for="contato in getContatos" :key="contato.id.user">
        <card class="" >
            <div class="pb-2 card-flex">
              <div class="card-avatar">
                <img v-if="contato.profilePicThumbObj && contato.profilePicThumbObj.eurl" class="card-img-avatar" :src="contato.profilePicThumbObj.eurl" >
                <img v-else class="card-img-avatar" src="../assets/img/no-img.png" >
              </div>
              <div class="card-content">
                <p>
                  <i v-if="contato.isUser"  class="fa fa-user"></i>
                  <i v-else class="fa fa-users color-warner"></i>
                  {{contato.name || contato.pushname}}
                </p>
                <p>
                  <i class="fa fa-whatsapp"></i>
                  {{contato.id.user}}
                </p>
                <p v-if="contato.isMyContact">
                  <i class="fa fa-floppy-o"></i> 
                  Contato da agenda
                </p>
              </div>
            </div>
        </card>
      </div>
    </div>
</template>

<script>
import { PaperTable, Loader } from "@/components";
import api from "@/services/api"
import { log } from 'util';
   
export default {
    name: 'Contacts',
    components: {
      PaperTable, Loader
    },
    data() {
      return {
          busy: false,
          contacts: []
      };
    },
    computed:{
        getContatos(){
            return this.contacts.filter(item => item.id.user !== '0')
        },
        getTotalContatos(){
            const contatos = this.contacts.filter(item => item.id.user !== '0')
            return `${contatos.length} Contatos` 
        },
    },
    monted:{
        //
    },
    methods:{
        setContatos(){
            this.busy = true
            api.get('contacts')
                .then((result) => {
                    this.contacts = result.data
                })
                .finally(() => {
                    this.busy = false
                })
        },
        onReport(){
          this.busy = true
          api.get('reports/contacts')
            .then( result => {
              const fileName = result.data.fileName
              window.open(`http://localhost:3000/pdfs/${fileName}`, '_blank');
            })
            .catch( () => {
              console.log('erro')
            })
            .finally(()=>{
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
</style>
