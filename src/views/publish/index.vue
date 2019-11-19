<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title" style="width: 400px" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <quill-editor ref="myQuillEditor" :option="editorOption" v-model="article.content"></quill-editor>
        </el-form-item>
        <!-- 富文本编辑器 -->

        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <!-- 不传参  为全部显示 -->
            <el-radio-button label="1">单图</el-radio-button>
            <el-radio-button label="3">三图</el-radio-button>
            <el-radio-button label="0">无图</el-radio-button>
            <el-radio-button label="-1">自动</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道列表">
          <el-select v-model="article.channel_id" placeholder="请选择文章列表">
            <el-option
              v-for="channel in channels"
              :key="channel.id"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onsubmit(false)">发表文章</el-button>
          <el-button @click="onsubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'PublishArticle',
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: '',
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: []
    }
  },
  created () {
    this.loadChannel()
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadChannel () {
      // 需要传入token 只有有token的用户才能拿到数据，保护接口 否则401错误
      this.$http({
        url: '/channels', // 路径
        method: 'GET' // 请求类型
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }
      })
        .then(res => {
          // 成功的话，可请求到参数
          // console.log(this.$route)
          this.channels = res.data.data.channels
        })
        .catch(() => {
          // 登录错误 提示信息 登陆失败
          console.log('shibais')
        })
      // .finally(() => {
      //   this.loading = false
      //   this.forbidden = false
      // })
    },
    onsubmit (draft) {
      this.$http({
        url: '/articles',
        method: 'POST',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        params: {
          draft
        },
        data: this.article
      })
        .then(res => {
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadArticle () {
      this.$http({
        url: `/articles/${this.$route.params.articleId}`,
        method: 'get'
      })
        .then(res => {
          console.log(res)
          this.article = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
