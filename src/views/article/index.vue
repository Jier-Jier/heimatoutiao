
<template>
  <div>
    <!-- 文章条件筛选区  👇 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <!-- 文章状态 👇 -->
        <el-form-item label="文章状态">
          <el-radio-group v-model="article.status">
            <!-- 不传参  为全部显示 -->
            <el-radio-button :label="null">全部</el-radio-button>
            <el-radio-button label="0">草稿</el-radio-button>
            <el-radio-button label="1">待审核</el-radio-button>
            <el-radio-button label="2">审核通过</el-radio-button>
            <el-radio-button label="3">审核失败</el-radio-button>
            <el-radio-button label="4">已删除</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- 按频道筛选  👇 -->
        <!-- <el-form-item label="频道列表">
          <el-select v-model="form.channel_id" placeholder="请选择文章列表">
            <el-option
              v-for="channel in channels"
              :key="channel.id"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="频道列表">
            <channel-load v-model="article.channel_id"></channel-load>
        </el-form-item>

        <!-- 筛选时间  👇 -->
        <el-form-item label="时间选择">
          <!--👇👇👇 value-format是ElementUI中内置的属性 通过它可以将日期
          格式转化为自己想要的格式以便进行后续使用 👇👇👇-->
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- 查询按钮 👇 -->
        <el-form-item>
          <!-- 点击查询  👇  展示查询结果 -->
          <el-button type="primary" @click="loadArticle(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章展示区域  👇 -->
    <el-card style="text-align: center">
      <div width="100%" style="text-align: left" slot="header" class="clearfix">
        <span>共{{this.articleValue}}条信息</span>
      </div>
      <el-table :data="articles" v-loading="loading" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.cover.images[0]" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" index="publish" @click="editArticle(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleValue"
        @current-change="onpageChange"
        :disabled="forbidden"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import channelLoad from '@/components/channelLoad'

export default {
  components: {
    channelLoad
  },
  name: 'Article',
  data () {
    return {
      articleValue: 0,
      loading: true,
      forbidden: false,
      channels: [],
      rangeDate: '',
      articles: [],
      page: 1,
      article: {
        status: null,
        channel_id: null
      },
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ]
    }
  },
  created () {
    this.loadArticle(1)
    // this.loadChannel()
  },
  methods: {
    // 页面变化加载指定页面   -----    👇
    onpageChange (page) {
      // console.log(page)
      this.page = page
      this.loadArticle(page)
    },
    // 获取文章列表   -----    👇
    loadArticle (page) {
      this.loading = true
      this.forbidden = true
      // const token = window.localStorage.getItem('user-token')
      // 需要传入token 只有有token的用户才能拿到数据，保护接口 否则401错误
      this.$http({
        url: '/articles', // 路径
        method: 'GET', // 请求类型
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        // query参数  需要通过params传递
        params: {
          page: page,
          per_page: 10,
          status: this.article.status,
          channel_id: this.article.channel_id ? this.article.channel_id : null,
          // 可从vue插件中得到相关属性值进行赋值
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }
      })
        .then(res => {
          // 成功的话，可请求到参数
          this.articleValue = res.data.data.total_count
          this.articles = res.data.data.results
        })
        .catch(() => {
          // 登录错误 提示信息 登陆失败
          console.log('shibai')
        })
        .finally(() => {
          this.loading = false
          this.forbidden = false
        })
    },
    // 删除文章功能   -----    👇
    delArticle (id) {
      // 需要传入token 只有有token的用户才能拿到数据，保护接口 否则401错误
      this.$http({
        url: `/articles/${id}`, // 路径
        method: 'DELETE' // 请求类型
        // query参数  需要通过params传递
      })
        .then(res => {
          // 成功

          this.loadArticle(this.page)
        })
        .catch(err => {
          // 登录错误 提示信息 登陆失败
          console.log(err, id, '失败')
        })
    },
    editArticle (id) {
      // 需要传入token 只有有token的用户才能拿到数据，保护接口 否则401错误
      this.$router.push(`/publish/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
}
</style>
