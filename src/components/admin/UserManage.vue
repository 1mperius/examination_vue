<template>
  <div >
    <Table border :columns="columns" :data="userList"></Table>

    <Modal v-model="modal" width="530">
      <div>
        <Tabs value="name1">
          <TabPane label="信息修改" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
                <FormItem label="手机号码" prop="phone">
                  <i-input v-model="formData.phone" size="large" readonly="readonly"></i-input>
                </FormItem>
                <FormItem label="用户名" prop="nickname">
                  <i-input v-model="formData.nickname" size="large"></i-input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                  <RadioGroup v-model="formData.sex">
                    <Radio label="0">
                      <Icon type="md-male"></Icon>
                      <span>男</span>
                    </Radio>
                    <Radio label="1">
                      <Icon type="md-female"></Icon>
                      <span>女</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="邮箱" prop="mail">
                  <i-input v-model="formData.mail" size="large"></i-input>
                </FormItem>
                <FormItem label="积分" prop="credit">
                  <i-input v-model="formData.credit" size="large"></i-input>
                </FormItem>
              </Form>
            </div>
            <Button type="primary" size="large" long @click="editAction">修改</Button>
          </TabPane>
          <TabPane label="头像修改" name="name2">
            <a href="javascript:;" class="a-upload">
              点击上传头像
              <input type="file" name="userImgUrl" accept="image/gif,image/jpeg,image/jpg,image/png" ref="img" @change="changeImage($event)">
            </a>
            <div class="user-img">
              <img :src="imgUrl"  >
            </div>
            <div  class="myHead-text">
              <Button @click="submitHead">提交头像</Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <Page :total = "total" :current="param.currPage" :page-size="param.pageSize" class="page" show-elevator @on-change="pageChange"/>
  </div>
</template>

<script>
  import {adminGetUserList,adminUpdateUser,adminGetUseCount,adminUpdateUserState,adminSetUserImgUrl} from "../../request/api";

  export default {
        name: "UserManage",
      data(){
          return{
          modal:false,
          columns:[
            {
              title: '头像',
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
              title: '姓名',
              key: 'nickname',
              align: 'center',
            },
            {
              title: '手机号',
              key: 'phone',
              align: 'center',
            },
            {
              title: '性别',
              key: 'sexChinese',
              align: 'center',
            },
            {
              title: '邮箱',
              key: 'mail',
              align: 'center',
            },
            {
              title: '积分',
              key: 'credit',
              align: 'center',
            },
            {
              title: '用户状态',
              key: 'state',
              align: 'center',
            },
            {
              title: '操作',
              key: 'operate',
              render: (h, params) => {
                return h('div', [
                  h('span', {
                    style:{
                      marginLeft: "15px",
                      fontSize: "14px",
                        color: "#2d8cf0",
                        cursor: "pointer",
                    },
                    on:{
                      'click':()=>{
                          this.formData.nickname =this.userList[params.index].nickname,
                            this.formData.phone =this.userList[params.index].phone,
                            this.formData.mail =this.userList[params.index].mail,
                            this.formData.credit =this.userList[params.index].credit,
                          this.imgUrl = this.userList[params.index].imgUrl,
                          this.phone = this.userList[params.index].phone,
                          this.formData.sex = this.userList[params.index].sex.toString(),
                          this.modal = true
                      }
                    }
                  },'编辑'),
                  h('span', {
                    style:{
                      display:("被冻结"==params.row.state)?"none":"inline",
                      marginLeft: "15px",
                      fontSize: "14px",
                      color: "#2d8cf0",
                      cursor: "pointer",
                    },
                    on:{
                       'click':()=>{
                         this.$Modal.confirm({
                           title: '信息提醒',
                           content: '你确定冻结该用户？',
                           onOk: () => {
                             let data ={};
                             data.phone = params.row.phone,
                               data.state = 1,
                               adminUpdateUserState(data).then(res=>{
                                 if(res.code==100){
                                   this.$Message.success("冻结该用户成功"),
                                     this.userList[params.index].state="被冻结"
                                 }
                               })
                           },
                           onCancel: () => {
                           }
                         });

                       }
                    }
                  },'冻结'),
                  h('span', {
                    style:{
                      display:("正常"==params.row.state)?"none":"inline",
                      marginLeft: "15px",
                      fontSize: "14px",
                      color: "#2d8cf0",
                      cursor: "pointer",
                    },
                    on:{
                      'click':()=>{
                        this.$Modal.confirm({
                          title: '信息提醒',
                          content: '你确定解冻该用户？',
                          onOk: () => {
                            let data ={};
                            data.phone = params.row.phone,
                              data.state = 0,
                              adminUpdateUserState(data).then(res=>{
                                if(res.code==100){
                                  this.$Message.success("解冻成功"),
                                    this.userList[params.index].state="正常"
                                }
                              })
                          },
                          onCancel: () => {
                          }
                        });

                      }
                    }
                  },'解冻'),
                ]);
              }
            }
          ],
          userList:[],
          total:20,
          param:{
              currPage: 1,
              pageSize: 10,
            },
           imgUrl:'',
            phone:'',
          formData:{
            nickname:'',
            phone:'',
            credit:'',
            mail:'',
            sex:''
          },
          ruleInline: {
            nickname: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
              ],
            sex: [
                { required: true, message: '请选择性别', trigger: 'blur' }
              ],
            mail: [
              { required: true, message: '邮箱不能为空', trigger: 'blur' },
              { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
            ]
            }
          }
      },
      created(){
          const  self = this;
          adminGetUserList(self.param).then(res=>{
               self.userList = res.data;
               for(var i=0;i<self.userList.length;i++){
                   if( self.userList[i].sex == 0){
                     self.userList[i].sexChinese ='男'
                   }else{
                     self.userList[i].sexChinese ='女'
                   }
                 if(self.userList[i].state == 0){
                   self.userList[i].state='正常'
                 }else{
                   self.userList[i].state='被冻结'
                 }
                 }
       })
          adminGetUseCount().then(res=>{
           if(res.code ==100){
             this.total = res.data
           }
        })
      },
     methods:{
       editAction(){
         adminUpdateUser(this.formData).then(res=>{
           if(res.code==100){
             this.$Message.success("修改成功"),
               this.modal = false;
           }
         })
       },
       pageChange(page){
         this.param.currPage = page,
         adminGetUserList(this.param).then(res=>{
           this.userList = res.data;
           for(var i=0;i<this.userList.length;i++){
             if( this.userList[i].sex == 0){
               this.userList[i].sexChinese ='男'
             }else{
               this.userList[i].sexChinese ='女'
             }
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
           that.imgUrl = this.result
         }
       },
       submitHead(){
         if(this.headImg != ''){
           let headImg = new FormData();
           headImg.append("headImg",this.headImg),
           headImg.append("phone",this.phone),
             adminSetUserImgUrl(headImg).then(res=>{
               if(res.code ==100){
                 this.$Message.success("更换头像成功"),
                   location.reload()
               }
             })
         }
       },

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
    border-radius:  50%;
    width: 130px;
    height:130px;
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
