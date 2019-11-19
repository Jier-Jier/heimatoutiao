<template>
  <div class="home">
    <el-container>
      <!-- 侧边导航部分 -->
      <el-aside width="220px">
        <!-- <el-col :span="12"> -->

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          text-color="#adafb5"
          background-color="#353b4e"
          active-text-color="#409eff"
          router
        >
          <div>
            <img src="../../assets/imgs/logo_admin.png" alt />
          </div>

          <el-menu-item index="layout">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <span>内容管理</span>
            </template>
            <!-- <el-menu-item-group> -->
            <el-menu-item index="publish">发布文章</el-menu-item>
            <el-menu-item index="article">内容列表</el-menu-item>
            <el-menu-item index="comment">评论列表</el-menu-item>
            <el-menu-item index="image">素材管理</el-menu-item>
            <!-- </el-menu-item-group> -->
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>粉丝管理</span>
            </template>
            <!-- <el-menu-item-group> -->
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="3-1">图文数据</el-menu-item>
            <el-menu-item index="3-2">粉丝概况</el-menu-item>
            <el-menu-item index="3-3">粉丝画像</el-menu-item>
            <el-menu-item index="3-4">粉丝列表</el-menu-item>
            <!-- </el-menu-item-group> -->
          </el-submenu>
          <el-menu-item index="account">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">账户信息</span>
          </el-menu-item>
        </el-menu>
        <!-- </el-col> -->
      </el-aside>
      <el-container style="margin-left:220px">
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutHeader from '@/components/layout-header.vue'
export default {
  name: 'home',
  components: {
    'layout-header': layoutHeader
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }

  }
}
</script>

<style lang="less" scoped>
.el-header {
  color: #f00;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #323745;
  color: #333;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  div {
    height: 56px;
    line-height: 56px;
    text-align: center;
    img {
      width: 150px;
      vertical-align: middle;
    }
  }

  .el-menu {
    background-color: "#353b4e";
    width: 221px;
    .el-menu-item-group {
      .el-menu-item-group__title {
        display: none;
      }
    }
    .el-submenu {
      .el-menu-item {
        background-color: #323745 !important;
      }
      .el-menu-item.is-active,
      .el-menu-item:hover {
        background-color: #409eff !important;
        color: #fff !important;
      }
    }
  }
}
.el-main {
  color: #333;
  text-align: left;
}
</style>
