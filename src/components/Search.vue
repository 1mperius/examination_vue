<template>
  <div class="container" id="my-search">
    <i-input v-model="searchData" size="large" class="sreach" placeholder="输入你想查找的商品">
      <Button slot="append" icon="ios-search" @click="sreach"></Button>
    </i-input>
  </div>
</template>

<script>
  import bus from "../assets/bus"
    export default {
        name: "mySearch",
      data () {
        return {
          searchData: '',
        };
      },
      methods: {
        sreach () {
          bus.$emit("search",this.searchData);
          this.$router.push({ path: `/product/search`, query: { searchData: this.searchData }});
        }
      }

    }
</script>

<style scoped>
  .container {
    padding-top: 15px;
    margin: 0px auto;
    margin-bottom: 15px;
    width: 460px;
  }
  .sreach {
    margin: 5px 0px;
  }
</style>
