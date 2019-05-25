<template>
    <div>
      <div class="admin-head-main">
        <div class="head-first">高考志愿填报辅助系统后台管理</div>
        <div class="head-button">
          <a v-if="isShow" @click="isShowSide">
            <Icon type="ios-arrow-dropleft-circle" size="30" color="white"/>
          </a>
          <a v-if="!isShow" @click="isShowSide">
            <Icon type="ios-arrow-dropright-circle" size="30" color="white"/>
          </a>
        </div>
        <div class="sn-quick-menu">
          <div class="head-second"><img :src="userinfo.imgUrl"/></div>
          <Dropdown class="userInfo">
            <a href="javascript:void(0)" class="sn-quick-menu-first">
              {{userinfo.adName}}
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list" class="headDrownMenu">
              <div>
                <img :src="userinfo.imgUrl" alt="" class="headImg">
              </div>
              <div>
                <div class="headDrownMenu1">
                  <a href="javascript:void(0)" @click="adminInfoChange"> 信息修改</a>
                  <span>|</span>
                  <a href="javascript:void(0) " @click="logout">退出</a>
                </div>


              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <Modal v-model="modal" width="530">
        <Tabs value="name1">
          <TabPane label="信息修改" name="name1">
            <div>
              <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline" ref="formData">
                <FormItem label="手机号码" prop="phone">
                  <i-input v-model="formData.phone" size="large" readonly="readonly"></i-input>
                </FormItem>
                <FormItem label="用户名" prop="name">
                  <i-input v-model="formData.name" size="large"></i-input>
                </FormItem>
                <FormItem label="邮箱" prop="mail">
                  <i-input v-model="formData.mail" size="large"></i-input>
                </FormItem>
              </Form>
            </div>
              <Button type="primary" size="large" long @click="submitAdminInfo('formData')" style="width: 100px;margin-left: 40%">修改</Button>
          </TabPane>
          <TabPane label="头像设置" name="name2">
            <a href="javascript:;" class="a-upload">
              点击上传头像
              <input type="file" name="userImgUrl" accept="image/gif,image/jpeg,image/jpg,image/png" ref="img" @change="changeImage($event)">
            </a>
            <div class="user-img">
              <img :src="userinfo.imgUrl"  >
            </div>
            <div  class="myHead-text">
              <Button @click="submitHead">提交头像</Button>
            </div>
          </TabPane>
          <TabPane label="密码修改" name="name3">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >

              <FormItem label="原密码" prop="oldPassword">
                <i-input type="password" v-model="formValidate.oldPassword" clearable size="large" placeholder="请输入你的原密码"></i-input>
              </FormItem>
              <FormItem label="密码" prop="newPassword">
                <i-input type="password" v-model="formValidate.newPassword" clearable size="large" placeholder="请输入你的密码"></i-input>
              </FormItem>
              <FormItem label="确认密码" prop="rePassword">
                <i-input type="password" v-model="formValidate.rePassword" clearable size="large" placeholder="请再次输入你的密码"></i-input>
              </FormItem>
              <div class="add-submit">
                <Button type="primary" @click="changePassword('formValidate')" style="margin-left: 40%">提交</Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
        <div slot="footer">
        </div>
      </Modal>

    </div>
</template>

<script>
  import {adminGetAdmin,adminUpdateAdmin,adminsetAdminImg,adminChangePassword,adminLogout} from "../../request/api";

  export default {
        name: "AdminHead",

       data(){
        const validatePassCheck = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.formValidate.newPassword) {
            callback(new Error('两次输入的密码不一样'));
          } else {
            callback();
          }
        };
          return{
            headImg:'',
            modal:false,
            isShow:true,
            userinfo:{
              adName:sessionStorage.getItem("name"),
              imgUrl:'',
              phone:'',
              mail:''
            },
            formData:{
              name:'',
              phone:'',
              mail:'',
            },
            ruleInline: {
              name: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
              ],
              mail: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
              ]
            },
            formValidate: {
              oldPassword: '',
              newPassword: '',
              rePassword: ''
            },
            ruleValidate: {
              oldPassword: [
                { required: true, message: '密码不能为空', trigger: 'blur' }
              ],
              newPassword: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { type: 'string', min: 6, message: '密码长度不能小于6', trigger: 'blur' }
              ],
              rePassword: [
                { required: true,validator: validatePassCheck, trigger: 'blur' }
              ]
            }

          }
      },
      methods:{
        logout(){
            this.$router.push('/adminlogin');
        },
        getAdmin(){
          adminGetAdmin().then(response=>{
            this.userinfo.name = response.data.name;
            this.userinfo.imgUrl = response.data.imgUrl;
            this.userinfo.phone = response.data.phone;
            this.userinfo.mail = response.data.mail;
          })
        },
        isShowSide(){
          this.isShow = !this.isShow,
          this.$emit("changeSideShow")
        },
        adminInfoChange(){
          this.modal = !this.modal,
          this.formData= this.userinfo
        },
        submitAdminInfo(name){
          this.$refs[name].validate((valid) => {
            if(valid){
              adminUpdateAdmin(this.formData).then(res=>{
                if(res.code ==100){
                  this.$Message.success("修改成功"),
                    this.modal = false
                }
              })
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
            that.userinfo.imgUrl = this.result
          }
        },
        submitHead(){
          if(this.headImg != ''){
            let headImg = new FormData();
            headImg.append("headImg",this.headImg),
              adminsetAdminImg(headImg).then(res=>{
                if(res.code ==100){
                  this.$Message.success("更换头像成功"),
                  location.reload()
                }
              })
          }
        },
        changePassword(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              const data ={
                oldPassword:this.formValidate.oldPassword,
                newPassword:this.formValidate.newPassword
              };
              adminChangePassword(data).then(res=>{
                if(res.code == 100){
                  this.$Message.success("修改密码成功"),
                    location.reload()
                }else{
                  this.$Message.error("原密码错误")
                  location.reload()
                }
              })
            }})

        }
      },
      created(){
          this.getAdmin()
      }
    }
</script>

<style scoped>
.admin-head-main{
  height: 50px;
  line-height: 40px;
  background-color: #5cadff;
  padding-top: 4px;
  display: flex;
}
.head-button{
  margin-left: 40px;
}
.headImg{
  width: 50px;
  height: 50px;
  margin-top: 30px;
  margin-left: 30px;
  border-radius:50%;
}
  .head-first{
    margin-left: 10px;
    font-size: 20px;
    color: white;
  }
  .head-second img{
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius:50%;
  }
.headDrownMenu{
  display: flex;
  width: 270px;
}
.headDrownMenu1{
  margin-left: 80px;
}
.sn-quick-menu{position: absolute; right: 150px;}
.sn-quick-menu-first{color: white}
.sn-quick-menu div{float: left;}
.sn-quick-menu div.login a:hover{color: #ff5500;}
.sn-quick-menu div.register{margin-right: 22px; }
.sn-quick-menu div.register a:hover{color: #ff5500;}
.sn-quick-menu div.userInfo{margin-right: 30px; }
.sn-quick-menu div.userInfo a:hover{color: #ff5500;}
.sn-quick-menu div.sp-cart a:hover{ color: #ff5500; font-weight: bold;}

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
