<template>
    <div v-if="loading">
        <div class="preloader">
            <div class="lds-ripple">
            <div class="lds-pos"></div>
            <div class="lds-pos"></div>
        </div>
    </div>
</div>
    
</template>
<script>
export default {
  name: 'loader',
  props: {
    loading: {
        type: Boolean,
        default: false,
        requirede: true
    }
  }
};
</script>
<style lang="scss" scoped>
    .preloader{
        width:100vw;
        height:100vh;
        top:0;
        left: 260px;
        position:fixed;
        z-index:1051;
        background:rgba(255,255,255,0.7);
        @media screen and (max-width: 992px){
            left: 0;
        }
    }

    .lds-ripple{
        display:inline-block;
        width:64px;
        height:64px;
        position:absolute;
        top:calc(50% - 32px);
        left:calc(50% - 162px);
        @media screen and (max-width: 992px){
            left: calc(50% - 32px);
        }
    }

      .lds-ripple
      .lds-pos{
        position:absolute;
        border:2px solid #333333;
        opacity:1;
        border-radius:50%;
        -webkit-animation:lds-ripple 1s cubic-bezier(0,.1,.5,1) infinite;
        animation:lds-ripple 1s cubic-bezier(0,.1,.5,1) infinite
      }
      .lds-ripple
      .lds-pos:nth-child(2){
        -webkit-animation-delay:-0.5s;
        animation-delay:-0.5s
      }

      @-webkit-keyframes lds-ripple{
        0%{top:28px;left:28px;width:0;height:0;opacity:0}
        5%{top:28px;left:28px;width:0;height:0;opacity:1}
        to{top:-1px;left:-1px;width:58px;height:58px;opacity:0}
      }
      @keyframes lds-ripple{
        0%{top:28px;left:28px;width:0;height:0;opacity:0}
        5%{top:28px;left:28px;width:0;height:0;opacity:1}
        to{top:-1px;left:-1px;width:58px;height:58px;opacity:0}
      }
</style>