<template>
    <div>
      <div class="add-container">
        <div class="add-title">
          <h1>密码修改</h1>
        </div>
        <div class="add-box">
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
              <Button type="primary" @click="changePassword('formValidate')">提交</Button>
            </div>
          </Form>
        </div>

      </div>
    </div>
</template>

<script>
  import {changePassword} from "../../request/api";

  export default {
        name: "ChangePassword",
      data () {
        const validatePassCheck = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.formValidate.newPassword) {
            callback(new Error('两次输入的密码不一样'));
          } else {
            callback();
          }
        };
        return {
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
        };
      },
      methods:{
        changePassword(name){
          const father = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              const data ={
                oldPassword:this.formValidate.oldPassword,
                newPassword:this.formValidate.newPassword
              };
              changePassword(data).then(res=>{
                console.log(res)
                if(res.code == 100){
                  this.$Message.success("修改密码成功"),
                    this.$router.push({ path: '/' });
                }else{
                  this.$Message.error("原密码错误")
                  location.reload()
                }
              })
            }})

        }
      }
    };
</script>

<style scoped>
  .add-container {
    margin: 15px auto;
    width: 60%;
    min-width: 600px;
  }
  .add-title {
    margin-bottom: 15px;
    text-align: center;
  }
  .add-submit {
    display: flex;
    justify-content: center;
  }
</style>

