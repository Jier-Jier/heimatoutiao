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
          <quill-editor
          ref="myQuillEditor"
          :option="editorOption"
          v-model="article.content"
        ></quill-editor>
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

        <!-- <el-form-item label="频道列表">
          <el-select v-model="article.channel_id" placeholder="请选择文章列表">
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
        <!-- 按钮   👇 -->
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
import channelLoad from '@/components/channelLoad'
export default {
  name: 'PublishArticle',
  components: {
    quillEditor,
    channelLoad
  },
  data () {
    return {
      editorOption: '',
      loading: true,
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
    // this.loadChannel()
    // if (this.$route.params.articleId) {
    //   this.loadArticle()
    // }
  },
  methods: {
    // loadChannel () {
    //   this.$http({
    //     url: '/channels', // 路径
    //     method: 'GET' // 请求类型
    //   })
    //     .then(res => {
    //       // 成功的话，可请求到参数
    //       this.channels = res.data.data.channels
    //     })
    //     .catch(() => {
    //       // 登录错误 提示信息
    //       console.log('shibais')
    //     })
    // },
    onsubmit (draft) {
      this.loading = true
      if (this.$route.params.articleId) {
        this.updateArticle(draft)
      } else {
        this.addArticle(draft)
      }
      this.$router.push('/article')
      this.loading = false
    },
    // 添加文章 👇
    addArticle (draft) {
      this.$http({
        url: '/articles',
        method: 'POST',
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
    // 加载要编辑的文章
    loadArticle () {
      this.$http({
        url: `/articles/${this.$route.params.articleId}`,
        method: 'get'
      })
        .then(res => {
          this.article = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 编辑文章 👇
    updateArticle (draft) {
      this.$http({
        url: `/articles/${this.$route.params.articleId}`,
        method: 'put',
        data: this.article
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '成功'
          })
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
