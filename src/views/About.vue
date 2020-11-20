<template>
  <div class="about">
    <div v-for="a in arr" :style="computedStyle">{{a}}</div>
  </div>
</template>
<script>
  export default{
    name : 'about',
    data(){
      return {
        arr : ['表体1','标题2','标题3','标题4']
      }
    },
    computed:{
      computedStyle(){
        for(let [k,v] of this.arr.entries()){
          
        }
        return {
          width :  160  + 'px'
        }
      }
    }
  }
</script>
