<template>
  <div class="sm-upload">

  </div>
</template>

<script>
  export default{
    name :'Upload',
    props:{

    },
    components:{

    },
    data(){
      return {

      }
    },
    watch:{

    },
    filters:{

    },
    computed: {

    },
    methods : {
      //单个上传
      submit(){
        const file = []
        const formdata = new FormData()
        formdata.append('file',file,file.name)
      }
    },
    beforeCreate(){

    },
    created(){

    },
    beforeMounte(){

    },
    mounted(){

    },
    beforeUpdate(){

    },
    updated(){

    },
    beforeDestory(){

    },
    destoryed(){

    },
    beforeRouteUpdate(){

    }
  }
</script>

<style lang="scss" scoped>
  $t : t;
  @mixin name($a,$b) {

  }
</style>
