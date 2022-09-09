<script>
  export default {
    name: "FakeMap",
    data(){
      return {
        picUrl: '',
      }
    },
      mounted() {
        fetch('http://localhost:8888/map_image').then( result => console.log(result))
        // fetch('http://localhost:8888/map_image')
        // .then((response) => response.json())
        // .then((data) => console.log(data));
      },
    methods: {
      doSomething(){
        console.log('hi from the function')
      }

    }
  }
</script>

<template>
  <p>{{someVar}}</p>
  <button @click="doSomething">hello</button>
  <img src="../images/map1.png" />
</template>
