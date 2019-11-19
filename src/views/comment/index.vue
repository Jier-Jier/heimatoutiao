<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <el-card style="text-align: center">
        <el-table :data="comments" style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="200"
          >
          </el-table-column>
          <!----------------------- 评论状态------------------------ 👇 -->
          <el-table-column
            prop = "comment_status"
            label="评论状态"
          >
          <template slot-scope="scope">
            <span> {{scope.row.comment_status ? '正常' : '关闭'}} </span>
          </template>
          </el-table-column>

          <!----------------------- 总评论数------------------------ 👇 -->
          <el-table-column
            prop="total_comment_count"
            label="总评论数"
          ></el-table-column>
          <!----------------------- 粉丝评论数---------------------- 👇 -->
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数"
          ></el-table-column>
          <!----------------------- 操作 --------------------------- 👇 -->
          <el-table-column
            prop="edit"
            label="操作"
          >
            <template slot-scope="scope">
               <!----------------------- 进入编辑 -------------------- 👇 -->
              <el-button
                size="mini"
                index="publish"
                @click="editComment(scope.row.comment_status)"
              >修改</el-button>
              <!----------------------- 开关评论 -------------------- 👇 -->
              <el-button
                size="mini"
                type="danger"
                @click="changeCommentStatus(scope.row)"
              >{{scope.row.comment_status ? '关闭评论' : '开启评论'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!----------------------- 分页器 --------------------------- 👇 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="commentValue"
          @current-change="onpageChange"
          :disabled="false"
        ></el-pagination>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentValue: 100,
      page: 1,
      comment: {
        status: null,
        channel_id: null
      },
      comments: []
    }
  },
  created () {
    this.loadComment(1)
  },
  methods: {
    onpageChange (page) {
      // 页面变化加载指定页面   -----    👇
      // console.log(page)
      this.page = page
      this.loadComment(page)
    },
    // 加载评论   --------------------    👇
    loadComment (page) {
      this.$http({
        url: '/articles',
        method: 'get',
        params: {
          page: page,
          per_page: 10,
          response_type: 'comment'
          // 可从vue插件中得到相关属性值进行赋值
        }
      }).then(res => {
        this.comments = res.data.data.results
        this.commentValue = res.data.data.total_count
        // this.commentValue = res.data.data.total_count
      }).catch(err => {
        console.log(err)
      })
    },
    // 加载评论   --------------------    👇
    changeCommentStatus (item) {
      this.$http({
        url: `/comments/status`,
        method: 'PUT',
        data: {
          allow_comment: !item.comment_status
        },
        params: {
          article_id: item.id.toString()
        }
      }).then(res => {
        console.log(res)

        this.loadComment(this.page)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang= "less">
.el-pagination {
  margin-top: 20px;
}
</style>
