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
            <!-- <template slot="title">分组一</template> -->
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
      <!-- header部分及main部分 -->
      <el-container>
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <i class="el-icon-s-fold">传智播客</i>
              </div>
            </el-col>
            <el-col style="text-align:right">
              <el-input style="width:200px" v-model="input" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-right">
                <img style="margin-right:14px" src="../../assets/imgs/avatar.jpg" alt />
                <span style="font-size:14px">哈哈哈哈</span>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  name: 'home',

  components: {},
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    logout () {
      this.$confirm('您将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }

}
</script>

<style lang="less" scoped>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;

  .el-row {
    // margin-bottom: 20px;
    background-color: #b3c0d1;
    display: flex;
    justify-content: space-between;
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-right {
    img {
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .grid-content {
    border-radius: 4px;
    // background: #d3dce6;
    min-height: 36px;
  }
}

.el-aside {
  background-color: #323745;
  color: #333;
  height: 100vh;
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
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
