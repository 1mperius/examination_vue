<template>
  <div>
    <div class="goods-list-box">
      <div class="goods-list">
        <div class="goods-show-info" v-for="(item, index) in productsList" :key="index">
          <div class="goods-show-seller">
            <span>{{item.productVo.name}}</span>
          </div>
          <div class="goods-show-img">
            <router-link to=""><img :src="item.productVo.imgUrl"/></router-link>
          </div>
          <div class="goods-show-price">
                <span>
                  <Icon type="social-yen text-danger"></Icon>
                  <span class="seckill-price text-danger">￥{{item.productVo.price}}</span>
                </span>
          </div>
          <div class="goods-show-detail">
            <span>{{item.productVo.descript}}</span>
          </div>
          <div class="goods-show-button">
            <Button type="primary" @click="exchange(item)">兑换</Button>
            <span class="credit-text">所需积分：</span>
            <span class="credit-text credit-num ">{{item.credit}}</span>
          </div>
        </div>
      </div>
      <Page :total = "total" :current="param.currPage" :page-size="param.pageSize" show-elevator @on-change="pageChange"/>
    </div>
  </div>
</template>

<script>
  import {getCreditProduct,getCreditProductCount,exchangeProduct} from "../../request/api";

  export default {
        name: "CreditProduct",
      data () {
        return {
          sreachItem: '',
          total:10,
          param:{
            currPage:1,
            pageSize:12,
          },
          productsList:[
          ]
        };
      },
    methods:{
      pageChange(page){
          this.param.currPage = page,
          getCreditProduct(this.param).then(res=>{
              if(res.code==100){
                this.productsList = res.data
              }
            })
      },
      getCreditProductCount(){
        getCreditProductCount().then(res=>{
          if(res.code==100){
            this.total = res.data
          }
        })
      },
      exchange(p){
        let data={};
         data.credit = p.credit,
          data.productName = p.productVo.name,
          console.log(data)
          exchangeProduct(data).then(res=>{
            if(res.code == 100){
              this.$Message.success("兑换成功")
            }else{
              this.$Message.error("积分不足")
            }
          })
      }
    },
     created(){
          const self = this;
          self.getCreditProductCount(),
          getCreditProduct(self.param).then(res=>{
            if(res.code==100){
              self.productsList = res.data
            }
          })
     }
    }
</script>

<style scoped>
  .text-danger {
    color: #A94442;
  }
  .credit-text{
    font-size: 15px;
  }
  .credit-num{
    color: #e13d13;
  }
  .seckill-price{
    margin-right: 5px;
    font-size: 25px;
    font-weight: bold;
  }
  .goods-list-box {
    margin-left: 18%;
    width: calc(90% - 215px);
  }
  .goods-list-tool{
    margin-top: 30px;
    width: 20%;
    height: 38px;
    border: 1px solid #ccc;
    background-color: #F1F1F1;
  }
  .goods-list-tool ul{
    padding-left: 15px;
    list-style: none;
  }
  .goods-list-tool li{
    cursor: pointer;
    float: left;
  }
  .goods-list-tool span{
    padding: 5px 8px;
    border: 1px solid #ccc;
    border-left: none;
    line-height: 36px;
    background-color: #fff;
  }
  .goods-list-tool span:hover{
    border: 1px solid #E4393C;
  }
  .goods-list-tool i:hover{
    color: #E4393C;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
  }
  .goods-show-info{
    width: 200px;
    padding: 10px;
    margin: 15px 5px;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .goods-show-info:hover{
    border: 1px solid #ccc;
    box-shadow: 0px 0px 15px #ccc;
  }
  .goods-show-img img{
    width: 120px;
    height: 160px;
    margin: 0px auto;
  }
  .goods-show-img{
    margin-left: 25px;
  }
  .goods-show-price{
    margin-top: 6px;
  }
  .goods-show-detail{
    font-size: 12px;
    margin: 6px 0px;
  }

  .goods-show-num span{
    color: #005AA0;
    font-weight: bold;
  }
  .goods-show-seller{
    font-size: 12px;
    color:#E4393C;
  }
</style>
