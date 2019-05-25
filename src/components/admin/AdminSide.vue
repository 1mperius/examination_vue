<template>
    <div class="side">
      <Menu theme="dark" :open-names="['1']" accordion class="side-menu" @on-select="onSelect">
        <Submenu name="userManage">
          <template slot="title">
            <Icon type="ios-contacts" size="25" />
            用户管理
          </template>
          <MenuItem name="adminUserInfo">用户信息查询</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="md-podium" size="25"/>
            排名管理
          </template>
          <MenuItem name="adminProductInfo">一分一段表</MenuItem>
          <!-- <MenuItem name="adminAddProduct">添加商品</MenuItem> -->
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="md-barcode" size="25"/>
            志愿推荐
          </template>
            <MenuItem name="adminOrderInfo">算法测试</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-book" size="25"/>
            大学信息管理
          </template>
          <MenuItem name="adminCredit">招生简章表</MenuItem>
          <MenuItem name="adminCollegeInfo">大学信息表</MenuItem>
          <MenuItem name="adminCollegeScore">大学招生分数表</MenuItem>
          <MenuItem name="adminMajorScore">专业招生分数表</MenuItem>
        </Submenu>
      </Menu>
    </div>
</template>

<script>
    export default {
        name: "my-adminSide",
        methods:{
        onSelect (name) {
          this.$emit("emitTitle",name);
          this.$router.push(`/admin/${name}`);
        }
      }
    }
</script>

<style>
.side{
  height: 100%;
}.side-menu{
  height: 100%;
 }
</style>
