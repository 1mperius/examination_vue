<template>
    <div id="my-head">
      <div class="site-nav-bg">
        <div class="site-nav w1200">
          <p class="sn-back-home">
             <Icon type ="md-home"></Icon>
            <router-link to="/">首页</router-link>
            <router-link to="/creditProduct"  style="margin-left: 50px">积分兑换</router-link>
          </p>
          <div class="sn-quick-menu">
            <div v-show="!loginState">
               <div class="login"> <router-link to="/login" >请登陆</router-link> <Icon type="md-person"></Icon></div>
                <div>|</div>
               <div class="register"><router-link to="/register" >免费注册</router-link><Icon type="md-person-add"></Icon></div>
            </div>
            <div v-show="loginState">
              <Dropdown class="userInfo">
                <a href="javascript:void(0)">
                  {{userinfo.nickname}}
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list" class="headDrownMenu">
                  <div>
                    <img :src="userinfo.imgUrl" alt="" class="headImg">
                  </div>
                    <div >
                      <div class="headDrownMenu1">
                        <a href="javascript:void(0)"> <router-link to="/user">账号管理</router-link></a>
                        <span>|</span>
                        <a href="javascript:void(0) " @click="logout">退出</a>
                      </div>
                      <div  class="headDrownMenu2">
                        <span style="margin-left: 50px">积分值：</span><span>{{userinfo.credit}}</span>
                      </div>
                    </div>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="sp-cart">
              <router-link to="/cart" >购物车</router-link>
              <Icon type="md-cart"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {checkLogin,logout,getUser} from "../request/api";

  export default {
        name: "my-head",
      data(){
          return{
            loginState:false,
            userinfo:{
              nickname:'',
              imgUrl:'',
              credit:'',
            }
          }
      },

      methods:{
         isLogin(){
           checkLogin().then(response=>{
              if (response.code== 100) {
                  this.loginState = true;
                  this.getUserInfo();
              }
              else {
                this.loginState = false;
              }
            })
         },

         logout(){
              const father = this;
              logout().then(response=>{
                father.$router.push('/login');
             })
         },
         getUserInfo(){
           getUser().then(response=>{
                  this.userinfo.nickname = response.data.nickname;
                  this.userinfo.imgUrl = response.data.imgUrl;
                  this.userinfo.credit = response.data.credit;
           })
         }
    },
      mounted(){
          this.isLogin();
      }

    }
</script>

<style scoped>
  body{font-family: "Microsoft YaHei", "SimSun", '\5b8b\4f53', sans-serif;  -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;     }
  .w1200{width: 1200px; margin:0 auto;}
  i{font-style: normal;}

  /* 头部导航主洋思 */
  .site-nav-bg{height: 30px; line-height: 30px; background-color: #f5f5f5;}
  .site-nav-bg a{color:#A9A9A9; }
  .site-nav{position: relative;}
  .sn-back-home{float: left;}
  .sn-back-home i{margin:0 4px 0 8px; font-size: 14px;}
  .sn-quick-menu{position: absolute; right: 12px;}
  .sn-quick-menu div{float: left;}
  .sn-quick-menu div.login a:hover{color: #ff5500;}
  .sn-quick-menu div.register{margin-right: 22px; }
  .sn-quick-menu div.register a:hover{color: #ff5500;}
  .sn-quick-menu div.userInfo{margin-right: 30px; }
  .sn-quick-menu div.userInfo a:hover{color: #ff5500;}
  .sn-quick-menu div.sp-cart a:hover{ color: #ff5500; font-weight: bold;}

  /*个人信息下拉框样式*/
 .headImg{
   width: 50px;
   height: 50px;
   margin-top: 30px;
   margin-left: 30px;
   border-radius:50%;
 }
  .headDrownMenu{
    display: flex;
    width: 270px;
  }
  .headDrownMenu1{
    margin-left: 80px;
  }
  .headDrownMenu2{
    margin-top: 40px;
  }
</style>
