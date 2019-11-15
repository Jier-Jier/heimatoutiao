<template>
  <!-- header部分及main部分 -->
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
        <img style="margin-right:14px" src="@/assets/imgs/avatar.jpg" alt />
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
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-row {
  // margin-bottom: 20px;
  // background-color: #b3c0d1;
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
</style>
