<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Welcome_test2</h3>
   
 
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App Welcome_test2',
      hotels:[]
    }
  },
  
    mounted(){
      let self = this
      axios.get('http://localhost:8080/api/account')
      .then((response) => {
        console.log(response.data);
        self.hotels=response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
