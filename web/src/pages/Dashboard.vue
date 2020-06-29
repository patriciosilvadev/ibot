<template>
  <div>
    <loader :loading="busy" />
    <!--Stats cards-->
    <div class="row">
      
      <div class="col-md-6 col-xl-4" >
        <stats-card v-if="status" >
          <div class="icon-big text-center icon-success" slot="header">
            <i class="ti-pulse"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Sessão</p>
            Iniciada
          </div>
          <div class="stats" slot="footer">
            <div class="hover" @click="putVenom">
                <i class="fa fa-repeat"></i> reiniciar
            </div>
          </div>
        </stats-card>
        <stats-card v-else >
          <div class="icon-big text-center icon-danger" slot="header">
            <i class="ti-pulse"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Sessão</p>
            ñ Iniciada
          </div>
          <div class="stats" slot="footer">
            <div class="hover" @click="initVenom">
                <i class="fa fa-play"></i> iniciar
            </div>
          </div>
        </stats-card>
      </div>
      <card v-if="urlImg" class="col-12 p-3 text-center">
        <img  :src="urlImg" alt="qrCode">
        <p class="mt-3">
          <button class="btn btn-primary" @click="relodImage">
            <i class="fa fa-qrcode"></i>
            recarregar
          </button>
        </p>
      </card>


    </div>

  </div>
</template>
<script>
import { StatsCard, Card, Loader } from "@/components/index";
import Chartist from 'chartist';
import api from  '../services/api';
export default {
  name: 'Dashborad',
  components: { StatsCard, Card, Loader },
  data() {
    return {
      busy: true,
      urlBase: 'http://localhost:3000/images/qr.png',
      urlImg: '',
      status: undefined,
    }
  },
  mounted () {
        this.statusVenom();
    },
    computed:{
        getUrlImg(){
            return this.urlImg
        }
    },
    methods:{
        relodImage(){
            this.urlImg = `${this.urlBase}?id=${Date.now()}`
        },
        initVenom(){
            this.busy = true;
            api.post('venom')
                .then(()=>{
                    this.status = true;
                    setTimeout(() => {
                            this.relodImage();
                        }, 3000)
                })
                .finally(() => {
                    this.busy = false;
                })
        },
        putVenom(){
            this.busy = true;
            api.put('venom')
                .then(()=>{
                    this.status = true;
                    setTimeout(() => {
                            this.relodImage();
                        }, 3000)
                })
                .finally(() => {
                    this.busy = false;
                })
        },
        statusVenom(){
          this.busy = true
            api.get('venom')
                .then(() => {
                    this.status = true
                })
                .catch((error) => {
                    if(!error.response){
                      this.notifyVue('O servidor está fora do ar.')
                    }
                    if(error.response.status === 400){
                        this.status = false
                    }
                    console.log('code', error.response);
                })
                .finally(()=>{
                  this.busy = false
                })
        },
        notifyVue(message) {
          this.$notify({
            message: message,
            icon: "fa fa-exclamation",
            horizontalAlign: "top",
            verticalAlign: "right",
            type: "danger"
          });
        }
    }
};
</script>
<style lang="scss" scoped>
.hover{
  cursor: pointer;
}
</style>
