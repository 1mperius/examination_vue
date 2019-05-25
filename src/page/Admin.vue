<template>
  <div class="main">
    <AdminHead v-on:changeSideShow="changeSideState"></AdminHead>
    <Layout  class="admin-main">
      <Sider hide-trigger class="admin-side" v-if="isShowSide">
        <my-admin-side v-on:emitTitle="getTitle"></my-admin-side>
      </Sider>
      <Layout  class="admin-content">
        <Content class="admin-content-main">
          <div class="content-nav" >
            <Icon type ="md-home" size="18" class="content-Icon"/>
            <div class="content-font">首页</div>
            <div class="content-font"> >{{firstTitle}}</div>
            <div class="content-font"> >{{secondTitle}}</div>
          </div>
          <router-view class="content-content admin-content-main"></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
    import MyAdminSide from "../components/admin/AdminSide";
    import UserManage from "../components/admin/UserManage";
    import AdminHead from "../components/admin/AdminHead";
    export default {
        name: "Admin",
      components: {AdminHead, UserManage, MyAdminSide},
      data(){
        return{
          bar: {
            'adminUserInfo':{
              manage:"用户管理",
              info:"用户信息查询"
            },
            'adminProductInfo': {
              manage:"排名管理",
              info:"一分一段表"
            },
            'adminAddProduct': {
              manage:"排名管理",
              info:'1'
            },
            'adminOrderInfo':{
              manage:"订单管理",
              info:'订单信息'
            },
            'adminCredit': {
              manage:"大学信息管理",
              info:'招生简章表'
            },
            'adminCollegeInfo':{
              manage:"大学信息管理",
              info:'大学信息表'

            },
            'adminCollegeScore':{
              manage:"大学信息管理",
              info:'大学招生分数表'
            },
            'adminMajorScore':{
              manage:"大学信息管理",
              info:'专业招生分数表'
            }
          },
          firstTitle:'用户管理',
          secondTitle:'用户信息查询',
          isShowSide:true
        }
      },
      methods:{
        getTitle(name){
          this.firstTitle = this.bar[name].manage,
          this.secondTitle = this.bar[name].info
        },
        changeSideState(){
          console.log("niha")
          this.isShowSide = !this.isShowSide
        }
      },
      created(){
          if(this.$route.name!="adminIndex"){
            this.firstTitle = this.bar[this.$route.name].manage,
              this.secondTitle = this.bar[this.$route.name].info
          }

      }
    }
</script>

<style>
  .content-nav{
    display: flex;
    height: 45px;
    line-height: 30px;
    font-size: 18px;
  }
  .content-content{
    background-color:white;
  }
  .content-Icon{
    margin-top: 10px;
  }
  .content-font{
    margin-top: 5px;
  }
.admin-main {
  height: calc(100% - 40px) ;
  width: 100%;
}
.admin-side{
    height:100% ;
    width: 250px;
  }
.main{
  height:100% ;
}
  .admin-content{
    margin-left: 40px;
  }
  .admin-content-main{
    height: 100%;
  }
</style>
