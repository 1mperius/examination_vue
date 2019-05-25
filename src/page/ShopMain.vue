<template>
  <div>
    <my-head></my-head>
    <my-search></my-search>
    <my-type></my-type>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
    import MyHead from "../components/Head";
    import MySearch from "../components/Search";
    import MyType from "../components/shopMain/Type";
    import MyFooter from "../components/Foot";
    import MyCart from "../components/Cart";
    export default {
        name: "ShopMain",
      components: {MyCart, MyFooter, MyType, MySearch, MyHead}
    }
</script>

<style scoped>

</style>
