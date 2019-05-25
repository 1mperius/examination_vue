<template>
    <div>
      <Tabs v-model:value="param.type"  @on-click="typeChange">
        <div v-for="(item,index) in typeList">
          <TabPane  :label="item.type" :name="item.type" ></TabPane>
        </div>
      </Tabs>
      <Table border :columns="columns" :data="productList"></Table>
      <Modal v-model="modal" width="530">
        <Tabs value="name1">
          <TabPane label="信息修改" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="商品名" prop="name">
                  <i-input v-model="formData.name" size="large" ></i-input>
                </FormItem>
                <FormItem label="商品描述" prop="descript">
                  <i-input v-model="formData.descript" size="large"></i-input>
                </FormItem>
                <FormItem label="价格" prop="price">
                  <i-input v-model="formData.price" size="large"></i-input>
                </FormItem>
                <FormItem label="上架状态" prop="state">
                  <RadioGroup v-model="formData.state">
                    <Radio label="0">
                      <Icon type=""></Icon>
                      <span>下架</span>
                    </Radio>
                    <Radio label="1">
                      <Icon type=""></Icon>
                      <span>上架</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="库存" prop="inventory">
                  <i-input v-model="formData.inventory" size="large"></i-input>
                </FormItem>
              </Form>
              <Button type="primary" size="large" long @click="editAction">修改</Button>
            </div>
          </TabPane>
          <TabPane label="图片修改" name="name2">
            <a href="javascript:;" class="a-upload">
              点击上传图片
              <input type="file" name="userImgUrl" accept="image/gif,image/jpeg,image/jpg,image/png" ref="img" @change="changeImage($event)">
            </a>
            <div class="user-img">
              <img :src="formData.imgUrl"  >
            </div>
            <div  class="myHead-text">
              <Button @click="submitHead">提交图片</Button>
            </div>
          </TabPane>
        </Tabs>

        <div slot="footer">
        </div>
      </Modal>
      <Modal v-model="credit" width="530">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>添加商品进积分表</span>
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
          <Button type="primary" size="large" long @click="addToCredit">添加</Button>
        </div>
      </Modal>
      <Page :total = "total" :current="param.currPage" :page-size="param.pageSize" class="page" show-elevator @on-change="pageChange"/>
    </div>
</template>

<script>
  import {adminGetProductList,adminGetProductType,adminUpdataeProduct,adminAddProductToCredit,adminGetProductNumByType,adminDeleteProduct,adminSetProductImg} from "../../request/api";

  export default {
        name: "ProductManage",
        data() {
          return {
            modal: false,
            credit: false,
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
                        src: params.row.imgUrl
                      }
                    })
                  ]);
                }
              },
              {
                title: '商品名',
                key: 'name',
                align: 'center',
                width: 95,
              },
              {
                title: '商品描述',
                key: 'descript',
                align: 'center',
              },

              {
                title: '价格',
                key: 'price',
                align: 'center',
              },
              {
                title: '上架状态',
                key: 'stateChinese',
                align: 'center',
              },
              {
                title: '库存',
                key: 'inventory',
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
                            this.formData = params.row,
                            this.formData.state = this.formData.state.toString(),
                            this.modal = true
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
                      on:{
                        'click':()=>{
                          this.$Modal.confirm({
                            title: '信息提醒',
                            content: '你确定删除该商品？',
                            onOk: () => {
                              let data={};
                              data.id= params.row.id,
                                adminDeleteProduct(data).then(res=>{
                                  if(res.code==100){
                                    this.$Message.success("删除成功"),
                                      location.reload()
                                  }
                                })
                            },
                            onCancel: () => {
                            }
                          });
                        }
                      }
                    }, '删除'),
                    h('span', {
                      style: {
                        marginLeft: "36px",
                        fontSize: "14px",
                        color: "#2d8cf0",
                        cursor: "pointer",
                      },
                      on: {
                        'click': () => {
                           this.formDataCredit.productName=params.row.name,
                            this.formDataCredit.credit = null
                            this.credit = true
                        }
                      }

                    }, '加入积分兑换表')
                  ]);
                }
              }
            ],
            productList: [],
            typeList:[],
            total:10,
            param: {
              currPage: 1,
              pageSize: 8,
              type:""
            },
            formData: {
              name: '',
              descript: '',
              price: '',
              inventory: '',
              state: '',
            },
            formDataCredit:{
              productName:'',
              credit:''
            },
            ruleInline: {
              name: [
                {required: true, message: '请输入商品名', trigger: 'blur'}
              ],
              descript: [
                {required: true, message: '请输入商品描述', trigger: 'blur'}
              ],
              price: [
                {required: true, message: '请输入价格', trigger: 'blur'}
              ],
              inventory: [
                {required: true, message: '请输入库存', trigger: 'blur'}
              ]

            },
            ruleInline1: {
              name: [
                {required: true, message: '请输入商品名', trigger: 'blur'}
              ],
              credit: [
                {required: true, message: '请输入积分数量', trigger: 'blur'}
              ]
            },
            headImg:''
          }
        },
        methods:{
          typeChange(){
            this.param.currPage = 1,
            this.getProductCount(this.param),
            adminGetProductList(this.param).then(res=>{
              if(res.code == 100){
                this.productList = res.data;
                for(var i=0;i<this.productList.length;i++){
                  if( this.productList[i].state == 0){
                    this.productList[i].stateChinese ='下架'
                  }else{
                    this.productList[i].stateChinese ='上架'
                  }
                }
              }
            })
         },
          editAction(){
          adminUpdataeProduct(this.formData).then(res=>{
           if(res.code==100){
             this.$Message.success("更新成功"),
             this.modal = false
           }
         })
          },
          addToCredit(){
          adminAddProductToCredit(this.formDataCredit).then(res=>{
              if(res.code ==100){
                this.$Message.success("添加成功"),
                  this.credit =false
              }else if(res.code ==102){
                this.$Message.error("已经存在该商品"),
                  this.credit = false
              }
            })
          },
          pageChange(page){
            this.param.currPage = page,
              adminGetProductList(this.param).then(res=>{
                if(res.code == 100){
                  this.productList = res.data;
                  for(var i=0;i<this.productList.length;i++){
                    if( this.productList[i].state == 0){
                      this.productList[i].stateChinese ='下架'
                    }else{
                      this.productList[i].stateChinese ='上架'
                    }
                  }
                }
              })
          },
          getProductCount(type){
            adminGetProductNumByType(type).then(res=>{
              if(res.code==100){
                this.total = res.data
              }
            })
          },
          changeImage(e) {
            var file = e.target.files[0]
            var reader = new FileReader()
            var that = this
            reader.readAsDataURL(file),
              that.headImg = e.target.files[0]
            reader.onload = function(e) {
              that.formData.imgUrl = this.result
            }
          },
          submitHead(){
            if(this.headImg != ''){
              let headImg = new FormData();
              headImg.append("productImg",this.headImg),
              headImg.append("productName",this.formData.name)
                adminSetProductImg(headImg).then(res=>{
                  if(res.code ==100){
                    this.$Message.success("更换图片成功"),
                      this.modal=false
                  }
                })
            }
          },
       },

       mounted(){
        const self = this;
         adminGetProductType().then(res=>{
           if(res.code  == 100){
             self.param.type = res.data[0],
             self.getProductCount(self.param),
             adminGetProductList(self.param).then(res=>{
               if(res.code == 100){
                 self.productList = res.data;
                 for(var i=0;i<this.productList.length;i++){
                   if( this.productList[i].state == 0){
                     this.productList[i].stateChinese ='下架'
                   }else{
                     this.productList[i].stateChinese ='上架'
                   }
                 }
               }
             });
             for (var i=0;i<res.data.length;i++){
               let data = {};
               data.type = res.data[i],
                 self.typeList[i]=data
             }
           }
         })
      }

    }
</script>

<style scoped>
  .myHead-text{
    margin-left: 12%;
    font-size:20px ;
    color: #91d5ff;
  }
  .user-img img{
    margin-top: 10%;
    margin-left: 40%;
    width: 140px;
    height:160px;
  }
  .a-upload {
    padding: 4px 10px;
    height: 30px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  .a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
  }
</style>
