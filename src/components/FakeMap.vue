<script>
  export default {
    name: "FakeMap",
    data(){
      return {
        mapImageUrl: 'map1.png',
      }
    },
      mounted() {
        fetch('http://localhost:8888/map_image').then( result => console.log(result))
        // fetch('http://localhost:8888/map_image')
        // .then((response) => response.json())
        // .then((data) => console.log(data));
      },
    methods: {
      changeImage(){
        //change iamgeurl
        if(this.mapImageUrl === 'map1.png'){
          this.mapImageUrl = 'map2.png';
          return this.mapImageUrl;
        } else if (this.mapImageUrl === 'map2.png'){
          this.mapImageUrl = 'map3.png';
          return this.mapImageUrl;
        } else if (this.mapImageUrl === 'map3.png'){
          this.mapImageUrl = 'map1.png';
          return this.mapImageUrl;
        }
      }

    }
  }
</script>

<template>
  <p>{{someVar}}</p>
  <button @click="changeImage">Change Image</button>
  <img :src="'/src/images/' + mapImageUrl" />
  <!-- <img src="../images/map1.png" /> -->
</template>
