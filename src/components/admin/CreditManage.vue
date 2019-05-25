<template>
  <div>
  <Table border :columns="columns" :data="productList"></Table>
    <Modal v-model="credit" width="530">
      <p slot="header">
        <Icon type="edit"></Icon>
        <span>编辑商品积分表</span>
      </p>
      <div>
        <Form :model="formDataCredit" label-position="left" :label-width="100" :rules="ruleInline1">
          <FormItem label="商品名" prop="name">
            <span>{{formDataCredit.productName}}</span>
          </FormItem>
          <FormItem label="所需积分" prop="credit">
            <i-input v-model="formDataCredit.credit" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="updateCredit">更新</Button>
      </div>
    </Modal>
    <Page :total = "total" :current="param.currPage" :page-size="param.pageSize" class="page" show-elevator @on-change="pageChange"/>
  </div>
</template>

<script>
  import {adminGetCreditProduct,adminUpdateProductCredit,adminDeleteProductCredit,adminGetCreditProductCount} from "../../request/api";

  export default {
        name: "CreditManage",
      data(){
          return{
            productList: [],
            total:0,
            param: {
              currPage: 1,
              pageSize: 12,
            },
            columns: [
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
                title: '所需积分',
                key: 'credit',
                align: 'center',
              },
              {
                title: '操作',
                key: 'operate',
                render: (h, params) => {
                  return h('div', [
                    h('span', {
                      style: {
                        marginLeft: "20px",
                        fontSize: "14px",
                        color: "#2d8cf0",
                        cursor: "pointer",
                      },
                      on: {
                        'click': () => {
                           this.formDataCredit.productName=this.productList[params.index].productVo.name,
                            this.formDataCredit.credit=this.productList[params.index].credit,
                            this.credit = true
                        }
                      }
                    }, '编辑'),
                    h('span', {
                      style: {
                        marginLeft: "25px",
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
                              let data = {};
                              data.productName = params.row.productVo.name,
                              adminDeleteProductCredit(data).then(res=>{
                                if(res.code==100){
                                  this.$Message.success('删除成功');
                                  location.reload()
                                }
                              })
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
            ],
            formDataCredit:{
              productName:'',
              credit:''
            },
            ruleInline1: {
              name: [
                {required: true, message: '请输入商品名', trigger: 'blur'}
              ],
              credit: [
                {required: true, message: '请输入积分数量', trigger: 'blur'}
              ]
            },
            credit:false
          }
      },
     methods:{
       updateCredit(){
         adminUpdateProductCredit(this.formDataCredit).then(res=>{
           if(res.code==100){
           this.$Message.success("更新成功"),
             this.credit = false
         }
         })
       },
       pageChange(page){
         this.param.currPage = page,
           adminGetCreditProduct(this.param).then(res=>{
             this.productList = res.data
           })
       },
       getCreditProductCount(){
         adminGetCreditProductCount().then(res=>{
           if(res.code==100){
             this.total = res.data
           }
         })
       }
     },
      mounted(){
        this.getCreditProductCount(),
        adminGetCreditProduct(this.param).then(res=>{
          this.productList = res.data
        })
      }
    }
</script>

<style scoped>

</style>
