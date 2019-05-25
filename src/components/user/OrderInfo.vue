<template>
  <div>
    <div v-if="!isDetail">
      <Tabs v-model:value="parm.state" @on-click="stateChange">
        <TabPane label="刚下单" name="0"></TabPane>
        <TabPane label="商家已接单" name="1"></TabPane>
        <TabPane label="退单" name="2"></TabPane>
        <TabPane label="已完成" name="3"></TabPane>
      </Tabs>
      <div class="order-box" v-for="(item, index) in orderList" :key="index">
        <div class="order-header">
          <div>{{item.createTime}}</div>
          <span>订单号:{{item.orderNo}}</span>
          <div class="address-action">
            <span @click="lookOrderDetail(index)"><Icon type="edit"></Icon> 订单详情</span>
            <span v-if="parm.state==0" @click="backOrder(index)"><Icon type="edit"></Icon> 退单</span>
            <span v-if="parm.state==1"  @click="backOrder(index)"><Icon type="edit"></Icon> 退单</span>
            <span v-if="parm.state==1" @click="confirmOrder(index)"><Icon type="edit"></Icon> 确认收货</span>
          </div>
        </div>
        <div class="order-content">
          <div class="order-orderItem" v-for="item in item.orderDetailVo">
            <img :src="item.productVo.imgUrl" />
            <div class="order-orderItem-content"> {{item.productVo.name}}</div>
            <div class="order-orderItem-content">  {{item.productVo.price}}</div>
            <div class="order-orderItem-content"> x{{item.productNum}}</div>
          </div>
        </div>
        <div class="order-price">订单总值：{{item.price}}</div>
      </div>
    </div>
    <div v-if="isDetail">
      <h2>订单详情</h2>
      <div class="orderItem-address">
        <h2>收货地址信息</h2>
        <p><span class="address-content-title"> 收 货 人 :</span> {{orderItem.addressVo.name}}</p>
        <p><span class="address-content-title">收货地址:</span> {{orderItem.addressVo.address}}</p>
        <p><span class="address-content-title">邮政编码:</span> {{orderItem.addressVo.postalCode}}</p>
      </div>
      <div class="orderItem-status">
        <h2>订单状态流程表</h2>
        <div v-for="item in changeStateToChinese">
             <span>{{item.state}}</span>
             <span>{{item.createTime}}</span>
        </div>
      </div>
      <Button type="primary" @click="returnOrder">返回</Button>
    </div>
  </div>
</template>

<script>
  import {getOrderInfo,changeOrderState,addCreditByFinishOrder} from "../../request/api";

  export default {
    name: 'MyOrder',
    data () {
      return {
        isDetail:false,
        orderList:[],
        orderItem:{},
        parm: {state:0},
      }
    },
    mounted(){
      getOrderInfo(this.parm).then(res=>{
        this.orderList = res.data
      })
    },
    methods:{
      stateChange(){
        getOrderInfo(this.parm).then(res=>{
          this.orderList = res.data
        })
      },
      lookOrderDetail(index){
       this.isDetail = true,
        this.orderItem =  this.orderList[index]
      },
      backOrder(index){
        const self = this;
        let data={};
        data.orderNo = self.orderList[index].orderNo,
        data.state = 2,
        changeOrderState(data).then(res=>{
             if(res.code == 100){
               self.$Message.success("退单成功"),
                 location.reload()
             }
           })
      },
      confirmOrder(index){
        const self = this;
        let data={};
        data.orderNo = self.orderList[index].orderNo,
          data.state = 3,
          changeOrderState(data).then(res=>{
            if(res.code == 100){
              self.$Message.success("确认收货"),
                addCreditByFinishOrder(data).then(res=>{
                  if(res.code == 100){
                    self.$Message.success("获得"+res.data+"积分"),
                      location.reload()
                  }
                })
            }
          })
      },
      returnOrder(){
        this.isDetail = false
      }
    },
    computed:{
        changeStateToChinese(){
          this.orderItem.orderStatusVo.forEach(item => {
            if(item.state==0){
              item.state ='刚下单'
            }else if (item.state==1){
              item.state ='商家接单'
            } else if (item.state==2) {
              item.state ='退单'
            }else {
              item.state ='完成'
            }
          })
          return this.orderItem.orderStatusVo;
        }
    }
  };
</script>

<style scoped>
  .order-box {
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #ccc;
  }
  .orderItem-address{
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #ccc;
  }
  .orderItem-status{
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #ccc;
  }
  .order-header{
    height: 35px;
    display: flex;
    justify-content: space-between;
    color: #232323;
    font-size: 18px;
  }
  .order-content {
    font-size: 20px;
  }
  .order-content img{
    width:60px;
    height:50px;
    padding: 2px;
    border:1px solid  #4d5669;
  }
  .order-orderItem{
    display: flex;
  }
  .order-orderItem-content{
    padding-top: 10px;
    margin-left: 10%;
    margin-bottom: 30px;
  }
  .order-content-title {
    color: #999;
  }
  .address-action span{
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
  }
  .order-price{
    margin-left: 80%;
    font-size:20px;
  }
</style>
