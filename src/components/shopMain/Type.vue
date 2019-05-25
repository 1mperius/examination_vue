<template>
    <div>
      <div class="search-nav">
        <div class="search-nav-container">
          <ul >
            <li>全部商品分类</li>
            <li v-for="type in typeList">
              <a  @click="sendType(type)">{{type}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {getProductType} from "../../request/api";
  import bus from "../../assets/bus"
  export default {
        name: "my-type",
      data(){
          return{
            typeList:[]
          }
      },
       methods:{
           sendType:function (parm) {
             bus.$emit("sendType",parm);
             this.$router.push({
               path: `/product/${parm}`,
             })
           }

    },
      created(){
        getProductType().then(res=>{
         this.typeList =  res.data
        })

      }
    }
</script>

<style scoped>
  .search-nav{
    width: 100%;
    height: 64px;
    border-bottom: 2px solid #B1191A;
  }
  .search-nav-container{
    width: 80%;
    min-width: 1000px;
    height: 64px;
    margin: 0px auto;
  }
  .search-nav-container-90{
    width: 90%;
  }
  .search-nav-container ul{
    margin: 0px;
    padding-left: 0px;
    list-style: none;
  }
  .search-nav-container li{
    cursor: pointer;
    margin-left: 30px;
    line-height: 64px;
    color: #C81623;
    font-size: 18px;
    /*font-weight: bold;*/
    float: left;
  }
  .search-nav-container a{
    color: #C81623;
    text-decoration: none;
  }
  .search-nav-container li:first-child{
    padding: 0px 38px;
    background:#B1191A;
    margin: 0px;
    color: #fff;
  }
</style>
