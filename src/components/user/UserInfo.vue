<template>
  <div>
    <Tabs>
      <TabPane label="基本信息">
         <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
           <FormItem label="手机号" prop="phone">
           <span>
             {{formData.phone}}
           </span>
           </FormItem>
         <FormItem label="用户名" prop="nickname">
           <span v-if="!isNameInput">
             {{formData.nickname}}
             <span @click="isName()" class="input-change">
             修改
             </span>
           </span>
          <i-input v-if="isNameInput"  v-model="formData.nickname" size="large"></i-input>
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
          <span v-if="!isMailInput">
             {{formData.mail}}
             <span @click="isMail()" class="input-change">
             修改
             </span>
           </span>
          <i-input v-if="isMailInput" v-model="formData.mail" size="large"></i-input>
        </FormItem>
        </Form>
        <Button @click="submit">提交</Button>
      </TabPane>
      <TabPane label="头像设置">
        <a href="javascript:;" class="a-upload">
          点击上传头像
        <input type="file" name="userImgUrl" accept="image/gif,image/jpeg,image/jpg,image/png" ref="img" @change="changeImage($event)">
        </a>
          <div class="user-img">
          <img :src="userImgUrl"  >
        </div>
        <div  class="myHead-text">
            <Button @click="submitHead">提交头像</Button>
        </div>
      </TabPane>
    </Tabs>

  </div>
</template>

<script>
  import {updateUser,setUserImgUrl,getUser} from "../../request/api";
    export default {
        name: "userInfo",
      data () {
        return {
          headImg:'',
          isNameInput:false,
          isMailInput:false,
          userImgUrl:'',
          formData: {
            phone:'',
            nickname: '',
            sex: '',
            mail: '',
          },
          formData1:'',
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
        };
      },
      mounted(){
         const self = this;
        getUser().then(res=>{
            self.userImgUrl = res.data.imgUrl,
            self.formData.phone = res.data.phone,
            self.formData.nickname = res.data.nickname,
            self.formData.sex = res.data.sex.toString(),
            self.formData.mail = res.data.mail
        })
      },
      methods:{
          isName(){
            this.isNameInput =!this.isNameInput
          },
        isMail(){
          this.isMailInput =!this.isMailInput
        },
        submit(){
          updateUser(this.formData).then(res=>{
            this.$Message.success("修改成功"),
            location.reload()})
        },
        changeImage(e) {
          var file = e.target.files[0]
          var reader = new FileReader()
          var that = this
          reader.readAsDataURL(file),
          that.headImg = e.target.files[0]
          reader.onload = function(e) {
            that.userImgUrl = this.result
          }
        },
        submitHead(){
           if(this.headImg != ''){
             let headImg = new FormData();
             headImg.append("headImg",this.headImg),
               setUserImgUrl(headImg).then(res=>{
                 if(res.code ==100){
                   this.$Message.success("更换头像成功"),
                     this.$router.push({ path: '/user/myInfo' });
                   location.reload()
                 }
               })
           }
        }
      }
    }
</script>

<style scoped>
.input-change{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
.user-img {
  margin-left: 20%;
  width: 180px;
  height:180px;
  display: flex;
  justify-content: center;
  border: 1px solid #2c3e50;
  overflow: hidden;
}
.myHead-text{
  margin-left: 12%;
  font-size:20px ;
  color: #91d5ff;
}
.user-img img{
  margin-top: 10%;
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
