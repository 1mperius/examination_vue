<template>
  <div class="container">
    <my-head ref="head"></my-head>
    <Layout class="layout">
      <Sider class="side-bar" :style="{height: 'calc(100vh - 35px)', background: '#fff', overflow: 'auto'}" ref="side" :collapsed-width="78">
        <Menu active-name="1-2" theme="light" width="auto" @on-select="onSelect">
          <div class="user-icon">
            <div >
              <img :src="userinfo.imgUrl" class="user-img">
            </div>
            <p>{{userinfo.nickname}}</p>
          </div>
          <Submenu name="0">
            <template slot="title">
              <Icon type="md-people"></Icon>
              <span>个人资料</span>
            </template>
            <MenuItem name="myInfo">个人信息修改</MenuItem>
            <MenuItem name="changePassword">更改密码</MenuItem>
          </Submenu>
          <Submenu name="1">
            <template slot="title">
              <Icon type="md-pin"></Icon>
              <span>收货地址</span>
            </template>
            <MenuItem name="address">我的收货地址</MenuItem>
            <MenuItem name="addAddress">添加收货地址</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="md-clipboard"></Icon>
              <span>购物订单</span>
            </template>
            <MenuItem name="myOrder">我的订单</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="md-cart"></Icon>
              <span>购物车</span>
            </template>
            <MenuItem name="cart">我的购物车</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="md-cart"></Icon>
              <span>积分</span>
            </template>
            <MenuItem name="creditChange">积分变化记录</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="layout">
        <Header :style="{background: '#fff'}">
          <h2>{{activeTitle}}</h2>
        </Header>
        <Content class="content">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </Content>
        <Footer class="layout-footer-center">2018 &copy; lin</Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import MyHead from "../components/Head";
  export default {
    name: 'User',
    components: {MyHead},
    data () {
      return {
        activeTitle: '我的个人信息',
          userinfo:{
            nickname:'',
            imgUrl:'',
            credit:'',
          },
        bar: {
          'myInfo':"我的个人信息",
          'address': '我的收货地址',
          'addAddress': '添加收货地址',
          'myOrder': '我的订单',
          'cart': '我的购物车',
          'changePassword':"修改密码",
          'creditChange':"积分变化记录"
        }
      };
    },

    methods: {
      onSelect (name) {
         this.activeTitle = this.bar[this.$route.name];
         this.$router.push(`/user/${name}`);
        this.activeTitle = this.bar[this.$route.name];
      }

    },

    mounted(){
      this.userinfo = this.$refs.head.userinfo,
      this.activeTitle = this.bar[this.$route.name];
    }


  };
</script>



<style scoped>
  .side-bar a{
    color: #232323;
  }
  .user-icon {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .user-icon span {
    font-size: 96px;
  }
  .user-img {
    margin-bottom: 15px;
    width: 96px;
    height: 96px;
    border-radius:  50%;
    overflow: hidden;
  }
  .user-img img{
    width: 100%;
  }
  .content {
    margin: 15px;
    background-color: #fff;
    padding: 15px;
  }
  .layout-footer-center {
    padding: 0px 15px;
    padding-bottom: 15px;
    text-align: center;
  }
</style>
