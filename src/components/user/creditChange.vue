<template>
    <div>
      <ul>
        <li v-for="item in creditChangeList">
          <span>{{item.createTime}}</span>
          <span v-if="item.creditChangeState==0">兑换
            <span>{{item.remark}}</span>
            <span>减少{{item.creditChangeNum}}积分</span>
          </span>
          <span v-if="item.creditChangeState==1">下单
            <span>{{item.remark}}</span>
            <span>获得{{item.creditChangeNum}}积分</span>
          </span>
        </li>
      </ul>
    </div>
</template>

<script>
  import {getCreditChange} from "../../request/api";
  export default {
        name: "creditChange",
        data(){
          return {
            creditChangeList:[]
          }
        },
      created(){
        getCreditChange().then(res=>{
          this.creditChangeList = res.data
        })
      }
    }
</script>

<style scoped>

</style>
