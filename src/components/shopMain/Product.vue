<template>
    <div>
      <div v-if="!isProductNow" class="goods-list-box">
        <div class="goods-list">
          <div class="goods-show-info" v-for="(item, index) in productsList" :key="index">
            <div class="goods-show-seller">
              <span>{{item.name}}</span>
            </div>
            <div class="goods-show-img">
              <router-link to=""><img :src="item.imgUrl"/></router-link>
            </div>
            <div class="goods-show-price">
                <span>
                  <Icon type="social-yen text-danger"></Icon>
                  <span class="seckill-price text-danger">￥{{item.price}}</span>
                </span>
            </div>
            <div class="goods-show-detail">
              <span>{{item.descript}}</span>
            </div>
            <div class="goods-show-button">
                 <Button type="primary" @click="addToCart(item)">添加进购物车</Button>
            </div>
          </div>
        </div>
        <Page :total = "total" :current="parm.currPage" :page-size="parm.pageSize" show-elevator @on-change="pageChange"/>
      </div>
      <div v-if=" isProductNow" class="isProduct-main"> 暂无此商品</div>
    </div>
</template>

<script>
  import {getProductByType,getProductType,addToCart,getProductNumByType,searchProduct,getSearchProductNum} from "../../request/api";
  import bus from "../../assets/bus";

  export default {
        name: "my-product",
      beforeRouteEnter (to, from, next) {
        window.scrollTo(0, 0);
        next();
      },
      methods:{
        addToCart:function(p){
          this.$Modal.confirm({
            title: '信息提醒',
            content: '你确定添加该商品进购物车吗',
            onOk: () => {
              const cartItem={
                productName:'',
                productNum: '',
              };
              cartItem.productNum = 1,
              cartItem.productName= p.name,
                addToCart(cartItem).then(res=>{
                  console.log(res)
                  if (res.code==100){
                    this.$Message.success("添加成功")
                  }
                  else{
                    this.$Message.error("请登录")
                  }
                })
            },
            onCancel: () => {
              this.$Message.info('取消删除');
            }
          });


        },
        pageChange(page){
          this.parm.currPage = page,
            getProductByType(this.parm).then(res=>{
              this.productsList = res.data
            })
        }
      },
      data () {
        return {
          isProductNow:false,
          sreachItem: '',
          total:10,
          parm:{
            currPage:1,
            pageSize:12,
            type:"",
          },
          productsList:[
          ]
        };
      },
      created(){
      var self = this;
      const data={};
      getProductType().then(res=>{
        if(self.$route.params.type ==null||self.$route.params.type=="search"){
                  self.parm.type =  res.data[0],
                  data.type = self.parm.type
              }else{
                self.parm.type =  self.$route.params.type,
                  data.type = self.parm.type
              }
            getProductNumByType(data).then(res=>{
              self.total = parseInt(res.data)
            }),
            getProductByType(self.parm).then(res=>{
            self.productsList = res.data
          })
        if(self.$route.query.searchData !=null){
          self.parm.currPage =1,
            self.parm.field = self.$route.query.searchData,
            data.field = self.parm.field,
            getSearchProductNum(data).then(res=>{
              self.total = parseInt(res.data)
            }),
            searchProduct(self.parm).then(res=>{
              self.productsList = res.data
            })
        }
         })


      },
      mounted(){
        const self = this;
        bus.$on("sendType",function (msg) {
          const data={};
          self.parm.currPage =1,
            self.parm.type = msg,
            data.type = self.parm.type,
          getProductNumByType(data).then(res=>{
            self.total = parseInt(res.data)
          }),
            getProductByType(self.parm).then(res=>{
              self.productsList = res.data
            })
        }),
        bus.$on("search",function (msg) {
            const data={};
              self.parm.currPage =1,
              self.parm.field = msg,
              data.field = self.parm.field,
          getSearchProductNum(data).then(res=>{
              self.total = parseInt(res.data)
            }),
              searchProduct(self.parm).then(res=>{
                self.productsList = res.data
              })
          })
      },
      watch:{
        productsList(newValue,oldValue){
          if(newValue[0]==null){
            this.isProductNow = true;
          }else{
            this.isProductNow = false;
          }
        }
      }

    }
</script>

<style scoped>
  .isProduct-main{
    margin-left: 40%;
    margin-top: 50px;
    margin-bottom: 60px;
    font-size: 30px;
    color: #f5222d;
  }
  .text-danger {
      color: #A94442;
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
  .goods-page {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
