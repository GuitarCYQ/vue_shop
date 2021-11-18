<template>
<!-- 头部 -->
  <el-container class="home-container">
  <el-header>
    <div>
      <img src="../assets/logo.png" alt=" ">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button></el-header>
  <!-- 头部 -->
  <el-container>
    <!-- 侧边栏 -->
    <!-- 判断折叠时的宽度 -->
    <el-aside :width="isCollapse ? '64px' : '220px' ">
      <div class="toggle-button" @click="toggleCollpse">|||</div>
      <!-- 侧边栏菜单区 -->
      <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EEF"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="activePath">
      <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
          <!-- 一级菜单的模板区 -->
          <template slot="title">
            <!-- 图标 -->
            <i :class="iconsObj[item.id]"></i>
            <!-- 文本 -->
            <span>{{item.authName}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index=" '/' + subItem.path " v-for="subItem in item.children"
          :key="subItem.id" @click="saveNavState('/' + subItem.path)">
            <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>{{subItem.authName}}</span>
          </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主体区 -->
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      // 以id为导航添加icon
      iconsObj: {
        125: 'el-icon-user',
        103: 'el-icon-s-check',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.success('退出成功')
    },
    // 获取使用菜单
    async getMenuList () {
      // 请求menus地址 获取数据
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮 切换菜单的折叠和展开
    toggleCollpse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  background: #37314d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img{
      width: 30px;
      height: 30px;
    }
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background: #333744;
  .el-menu {
    border: none;
  }
}
.el-main{
  background: #eaedf1;
}
.toggle-button{
  background: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
