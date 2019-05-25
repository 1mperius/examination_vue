<template>
  <div>
    <div class="goods-list-container">
      <Alert show-icon class="tips-box">
        小提示
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <template slot="desc">请点击商品前的选择框，选择购物车中的商品，点击结算即可。</template>
      </Alert>
      <Table border ref="selection"  @on-selection-change="select" :columns="columns" :data="cartItemList" size="large"  no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买">
      </Table>

      <div class="pay-container">
        <div class="pay-box">
          <p><span>应付总额：</span> <span class="money"><Icon type="social-yen"></Icon> {{totalPrice.toFixed(2)}}</span></p>
          <div class="pay-btn">
            <router-link to="/order"><Button type="error" size="large" >去结算</Button></router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getCart,cartProductNumChange,deleteCartItem} from "../request/api";
  import  bus from "../assets/bus"
  export default {
        name: "Cart",
      data () {
        return {
          cartItemList:[],
          cartItemListCopy :[],
          productsCheckList: [],
          columns: [
            {
              type: 'selection',
              width: 58,
              align: 'center'
            },
            {
              title: '图片',
              key: 'imgUrl',
              align: 'center',
              width: 95,
              render: (h, params) => {
                return h('div', [
                  h('img', {
                    style:{
                      width:"60px",
                      height:'50px',
                    },
                    attrs: {
                      src: params.row.imgUrl
                    }
                  })
                ]);
              }
            },
            {
              title: '商品名',
              key: 'name',
              width: 198,
              align: 'center'
            },
            {
              title: '描述',
              key: 'descript',
              align: 'center'
            },
            {
              title: '数量',
              key: 'productNum',
              width: 160,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('button', {
                    style:{
                      width:"20px",
                      height:'20px',
                      cursor:'pointer',
                    },
                    on:{
                       'click': ()=> {
                         const cartItem={
                         };
                         if(params.row.productNum<2){
                           this.$Modal.confirm({
                             title: '信息提醒',
                             content: '你确定删除这个商品',
                             onOk: () => {
                               const cartItem={
                               };
                               cartItem.productName = params.row.name,
                                 this.changeProductCheckList(params.row.id,params.row.productNum-1),
                                 this.cartItemListCopy[params.index].productNum=params.row.productNum-1,
                                 this.$Message.success("删除成功"),
                                 deleteCartItem(cartItem).then(res=>{}),
                                 this.cartItemList.splice(params.index,1)
                             },
                             onCancel: () => {
                               this.$Message.info('取消删除');
                             }
                           });
                         }else {
                             params.row.productNum--,
                             this.changeProductCheckList(params.row.id,params.row.productNum),
                             this.cartItemListCopy[params.index].productNum=params.row.productNum,
                             cartItem.productNum=params.row.productNum,
                             cartItem.productName = params.row.name,
                             cartProductNumChange(cartItem).then(res=>{
                             })
                         }
                       }
                      }
                  },'-'
                  ),
                  h('span',{
                    style:{
                      width:"30px",
                      height:'20px',
                      marginLeft:'20px',
                      paddingRightRight:'20px'}
                      },params.row.productNum),
                  h('button', {
                    style:{
                      width:"20px",
                      height:'20px',
                      cursor:'pointer',
                      marginLeft:'20px'
                    },
                    on:{
                      'click':()=>{
                        const data={
                          productName:'',
                          productNum: '',
                        };
                          params.row.productNum++,
                            this.changeProductCheckList(params.row.id,params.row.productNum),
                            this.cartItemListCopy[params.index].productNum=params.row.productNum,
                          data.productNum=params.row.productNum,
                          data.productName = params.row.name,
                          cartProductNumChange(data)
                      }
                    }
                  },'+')
                ]);
              }
            },
            {
              title: '价格',
              width: 98,
              key: 'price',
              align: 'center'
            },
            {
              title: '操作',
              key: 'operate',
              align: 'center',
              width: 90,
              render: (h, params) => {
                return h('div', [
                  h('span', {
                    style: {
                      fontSize: "14px",
                      color: "#2d8cf0",
                      cursor: "pointer",
                    },
                    on: {
                      'click': () => {
                        this.$Modal.confirm({
                          title: '信息提醒',
                          content: '你确定删除这个商品',
                          onOk: () => {
                            const cartItem={
                            };
                             cartItem.productName = params.row.name,
                              this.changeProductCheckList(params.row.id,params.row.productNum-1),
                              this.cartItemListCopy[params.index].productNum=params.row.productNum-1,
                              this.$Message.success("删除成功"),
                              deleteCartItem(cartItem).then(res=>{}),
                              this.cartItemList.splice(params.index,1)
                          },
                          onCancel: () => {
                            this.$Message.info('取消删除');
                          }
                        });
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ]
        };
      },
      methods:{
      select (selection) {
        for (var i=0;i<selection.length;i++){
          selection[i].productNum = this.cartItemListCopy[selection[i].id].productNum
        }
        this.productsCheckList = selection;
      },
      changeProductCheckList(p1,p2){
        for(var i=0;i<this.productsCheckList.length;i++){
          if(this.productsCheckList[i].id==p1){
            this.productsCheckList[i].productNum =p2
          }
        }
        },
    },
      created(){
        getCart().then(res=>{
        for (var i =0;i<res.data.length;i++) {
           let cartItem={};
            cartItem.id =  i,
            cartItem.productNum = res.data[i].productNum,
            cartItem.name = res.data[i].productVo.name,
            cartItem.descript=res.data[i].productVo.descript,
            cartItem.price = res.data[i].productVo.price,
            cartItem.imgUrl = res.data[i].productVo.imgUrl,
            this.cartItemList.push(cartItem)
        };
        for (var i =0;i<res.data.length;i++) {
          let cartItem={};
            cartItem.id =  i,
            cartItem.productNum = res.data[i].productNum,
            cartItem.name = res.data[i].productVo.name,
            cartItem.descript=res.data[i].productVo.descript,
            cartItem.price = res.data[i].productVo.price,
            cartItem.imgUrl = res.data[i].productVo.imgUrl,
            this.cartItemListCopy.push(cartItem)
        }
      })
      },
      computed: {
        totalPrice () {
          let price = 0;
          this.productsCheckList.forEach(item => {
            price += item.price * item.productNum;
          });
          return price;
        }
      },
      beforeDestroy() {
        bus.$emit("sendProduct",this.productsCheckList);
    },

    }
</script>

<style scoped>
  .goods-list-container {
    margin: 15px auto;
    width: 80%;
  }
  .tips-box {
    margin-bottom: 15px;
  }
  .address-container {
    margin-top: 15px;
  }
  .address-box {
    margin-top: 15px;
    padding: 15px;
    border: 1px #ccc dotted;
  }
  .address-check {
    margin: 15px 0px;
    height: 36px;
    display: flex;
    align-items: center;
  }
  .address-check-name {
    width: 120px;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #ccc;
  }
  .address-check-name span {
    width: 120px;
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    background-color: #f90013;
  }
  .address-detail {
    padding-left: 15px;
    font-size: 14px;
    color: #999999;
  }
  .remarks-container {
    margin: 15px 0px;
  }
  .remarks-input {
    margin-top: 15px;
  }
  .invoices-container p{
    font-size: 12px;
    line-height: 30px;
    color: #999;
  }
  .pay-container {
    margin: 15px;
    display: flex;
    justify-content: flex-end;
  }
  .pay-box {
    font-size: 18px;
    font-weight: bolder;
    color: #495060;
  }
  .money {
    font-size: 26px;
    color: #f90013;
  }
  .pay-btn {
    margin: 15px 0px;
    display: flex;
    justify-content: flex-end;
  }
</style>
