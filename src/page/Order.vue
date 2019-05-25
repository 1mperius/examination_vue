<template>
    <div>
      <my-head></my-head>

      <div class="goods-list-container">
        <Table border  :columns="columns" :data="orderItem" size="large" >
        </Table>

        <div class="address-container">
          <h3>收货人信息</h3>
          <div class="address-box">
            <div class="address-check">
              <div class="address-check-name">
                <span><Icon type="ios-checkmark-outline"></Icon> {{checkAddress.name}}</span>
              </div>
              <div class="address-detail">
                <p>{{checkAddress.address}}</p>
              </div>
            </div>
            <Collapse>
              <Panel>
                选择地址
                <p slot="content">
                  <RadioGroup vertical v-model="orderDto.addressId" size="large" @on-change="changeAddress">
                    <Radio :label="item.id" v-for="(item, index) in address" :key="index">
                      <span>{{item.name}} {{item.address}} {{item.phone}} {{item.postalCode}}</span>
                    </Radio>
                  </RadioGroup>
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>

        <div class="remarks-container">
          <h3>备注</h3>
          <i-input v-model="orderDto.remark" size="large" placeholder="在这里填写备注信息" class="remarks-input"></i-input>
        </div>
        <div class="invoices-container">
          <h3>发票信息</h3>
          <p>该商品不支持开发票</p>
        </div>
        <div class="pay-container">
          <div class="pay-box">
            <p><span>提交订单应付总额：</span> <span class="money"><Icon type="social-yen"></Icon> {{totalPrice.toFixed(2)}}</span></p>
            <div class="pay-btn">
              <Button type="error" size="large" @click="placeOrder">下单</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {addOrder,getAddress,deleteCartItem} from "../request/api";
  import bus from "../assets/bus";
  import MyHead from "../components/Head";
  export default {
        name: "Order",
    components: {MyHead},
    data(){
          return {
            list:[],
            orderItem:[],
            address:[],
            orderDto:{
              addressId:'',
              remark:'',
            },
            checkAddress: {
              name: '未选择',
              address: '请选择地址'
            },
            columns: [

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
                width: 200,
                align: 'center',
              },
              {
                title: '价格',
                width: 68,
                key: 'price',
                align: 'center'
              }
            ]
          };
      },
    created(){
          const self = this;
          bus.$on("sendProduct",function (msg) {
          self.orderItem = msg
        }),
          getAddress().then(res=>{
            self.address = res.data
          })
     },
    methods:{
      changeAddress (data) {
        const father = this;
        this.address.forEach(item => {
          if (item.id === data) {
            father.checkAddress.name = item.name;
            father.checkAddress.address = `${item.name} ${item.address} ${item.phone} ${item.postalCode}`;
          }
        });
      },
      placeOrder(){
        const  self = this;
        for(var i=0;i<this.orderItem.length;i++){
          let data={};
           data.productName = this.orderItem[i].name,
            data.productNum = this.orderItem[i].productNum,
             this.list.push(data)
        }
        const orderDetail = JSON.stringify(this.list);
        this.orderDto.orderDetail = orderDetail,
        addOrder(this.orderDto).then(res=>{
          if(res.code == 100){
            this.$Message.success("下单成功")
            this.$router.push({ path: '/' });
            //下单成功则移除购物车
            for(var i=0;i<self.orderItem.length;i++){
              let data1={};
              data1.productName = self.orderItem[i].name,
                deleteCartItem(data1).then(res=>{
                })
            }

          }
        })
      }
    },
    computed: {
      totalPrice () {
        let price = 0;
        this.orderItem.forEach(item => {
          price += item.price * item.productNum;
        });
        return price;
      }
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
