<template>
  <div class="login">
    <Row class="container">
      <i-col span="7" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <p>高考志愿填报辅助系统服务器端</p>
          </div>
          <div class="form-box">
            <Form ref="formInline" :model="formDate" :rules="ruleInline">
              <FormItem prop="phone">
                <i-input type="text" v-model="formDate.adAccount" clearable size="large" placeholder="账号">
                  <Icon type="person" slot="prepend"></Icon>
                </i-input>
              </FormItem>
              <FormItem prop="password">
                <i-input type="password" v-model="formDate.adPassword" clearable size="large" placeholder="密码">
                  <Icon type="ios-locked-outline" slot="prepend"> </Icon>
                </i-input>
              </FormItem>
              <FormItem>
                <Button type="success" size="large" @click="handleSubmit('formInline')" long >登陆</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import {adminlogin} from "../request/api";

  export default {
        name: "AdminLogin",
      data () {
        return {
          formDate: {
            adAccount: '',
            adPassword: ''
          },
          ruleInline: {
            adAccount: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            adPassword: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { type: 'string', min: 4, message: '密码不能少于4位', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        handleSubmit (name) {
          const father = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
 
              adminlogin(father.formDate).then(result => {
                if (result.status==200) {
                  this.$Message.success('登陆成功');
                  sessionStorage.setItem("name",result.data.adName);
                  father.$router.push('/admin')             
                } else {
                  this.$Message.error(result.msg);
                }
              });
            } else {
              this.$Message.error('请填写正确的用户名或密码');
            }
          });
        }
      },


    }
</script>

<style scoped>
  .login{
    height: 100%;

  }
  .container {
    height: 100%;
    width:100%;
    background-image: url("../assets/Login.jpg");
    background-color: #fff;
  }

  .login-img-box>img {
    width: 68%;
  }
  .login-box {
    margin-left: 35%;
    height: 485px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-container {
   margin-top: 15%;
    width: 100%;
    height: 280px;
    border: #2c3e50 solid 1px;
  }
  .login-header {
    height: 50px;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    letter-spacing: 5px;
    color: white;
    background-color: #2c3e50;
  }
  .form-box {
    width: 80%;
    margin: 30px auto;
  }
</style>
