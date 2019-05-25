<template>
  <div>
    <Tabs v-model:value="param.state" @on-click="stateChange">
      <TabPane label="刚下单" name="0"></TabPane>
      <TabPane label="已接单" name="1"></TabPane>
      <TabPane label="退单" name="2"></TabPane>
      <TabPane label="已完成" name="3"></TabPane>
    </Tabs>
    <Table border :columns="columns" :data="orderList"></Table>
    <Modal v-model="isDetail">
      <h1 >订单详情</h1>
      <div  v-if="isDetail">
        <div class="orderItem-main">
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
        </div>
        <div class="orderItem-detail">
          <h2>商品信息</h2>
          <Table border :columns="columns1" :data="orderItem.orderDetailVo"></Table>
        </div>

      </div>
      <div slot="footer">
        <Button type="primary"  @click="returnOrder">返回</Button>
      </div>
    </Modal>

    <Page :total = "total" :current="param.currPage" :page-size="param.pageSize" class="page" show-elevator @on-change="pageChange"/>
  </div>

</template>

<script>
  import {adminGetOrderList,adminChangeOrderState,adminGetOrderCountByState,changeOrderState} from "../../request/api";

  export default {
        name: "OrderManage",
      data() {
        return {
          isDetail:false,
          columns: [
            {
              title: '订单编号',
              key: 'orderNo',
              align: 'center',
              width:200
            },
            {
              title: '用户电话',
              key: 'uphone',
              align: 'center',
              width:120
            },

            {
              title: '订单备注',
              key: 'remark',
              align: 'center',
            },
            {
              title: '订单价格',
              key: 'price',
              align: 'center',
              width:100
            },
            {
              title: '下单时间',
              key: 'createTime',
              align: 'center',
              width:200
            },
            {
              title: '操作',
              key: 'operate',
              align: 'center',
              width:230,
              render: (h, params) => {
                return h('div', [
                  h('span', {
                    style: {
                      marginLeft: "15px",
                      fontSize: "14px",
                      color: "#2d8cf0",
                      cursor: "pointer",
                    },
                    on: {
                      'click': () => {
                        this.isDetail = true,
                          this.orderItem =  this.orderList[params.index]
                      }
                    }
                  }, '订单详情'),
                  h('span', {
                    style: {
                      display:(0==params.row.state)?"inline":"none",
                      marginLeft: "15px",
                      fontSize: "14px",
                      color: "#2d8cf0",
                      cursor: "pointer",
                    },
                    on:{
                      'click': () => {
                        this.$Modal.confirm({
                          title: '信息提醒',
                          content: '你确定接受该订单？',
                          onOk: () => {
                            let data={};
                            data.orderNo = params.row.orderNo,
                              data.state = 1,
                              adminChangeOrderState(data).then(res=>{
                                console.log(res)
                                if(res.code == 100){
                                  this.$Message.success("接单成功"),
                                    location.reload()
                                }
                              })
                          },
                          onCancel: () => {
                          }
                        });

                      }
                    }
                  }, '接单'),
                  h('span', {
                    style: {
                      display:((0==params.row.state)||(1==params.row.state))?"inline":"none",
                      marginLeft: "15px",
                      fontSize: "14px",
                      color: "#2d8cf0",
                      cursor: "pointer",
                    },
                    on:{
                      'click':()=>{
                        this.$Modal.confirm({
                          title: '信息提醒',
                          content: '你确定取消该订单？',
                          onOk: () => {
                            let data={};
                            data.orderNo = params.row.orderNo,
                            data.state = 2,
                              changeOrderState(data).then(res=>{
                                if(res.code == 100){
                                  this.$Message.success("退单成功"),
                                   location.reload()
                                }
                              })
                          },
                          onCancel: () => {
                          }
                        });
                      }
                    }
                  }, '取消订单')
                ]);
              }
            }
          ],
          orderItem:{},
          orderList: [],
          typeList:[],
          total:0,
          param: {
            currPage: 1,
            pageSize: 18,
            state:0
          },
          columns1:[
            {
              title: '商品图片',
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
                      src: params.row.productVo.imgUrl
                    }
                  })
                ]);
              }
            },
            {
              title: '商品名',
              key: 'name',
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('span', params.row.productVo.name)
                ]);
              }
            },
            {
              title: '价格',
              key: 'price',
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('span', params.row .productVo.price)
                ]);
              }
            },
            {
              title: '数量',
              key: 'productNum',
              align: 'center',
            },
          ],

        }
      },
      methods:{
        stateChange(){
          this.param.currPage =1,
          adminGetOrderList(this.param).then(res=>{
            if(res.code ==100){
              this.orderList = res.data
            }
          }),
          this.getOrderCountByState(this.param)
        },
        returnOrder(){
          this.isDetail = false,
            console.log(this.isDetail)
        },
        getOrderCountByState(state){
          adminGetOrderCountByState(state).then(res=>{
            if(res.code==100){
              this.total = res.data
            }
          })
        },
        pageChange(page){
          this.param.currPage = page,
            adminGetOrderList(this.param).then(res=>{
              if(res.code ==100){
                this.orderList = res.data
              }
            })
        },
      },
      mounted(){
        this.getOrderCountByState(this.param),
        adminGetOrderList(this.param).then(res=>{
          if(res.code ==100){
            this.orderList = res.data
          }
        })
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
    }
</script>

<style scoped>
.orderItem-main{
  display: flex;
}
h1{
  margin-left: 40%;
}
  .orderItem-detail h2{
    margin-left: 40%;
  }
  .orderItem-status{
    margin-left: 40%;
  }

</style>
