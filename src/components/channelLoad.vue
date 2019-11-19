<template>
  <div class="channel">
    <!-- 按频道筛选  👇 -->
      <el-select
      placeholder="请选择频道"
      @input="onInput"
      :value="value"
    >
      <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="channel in channels"
        :key="channel.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'channelLoad',
  data () {
    return {
      channels: []
    }
  },
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    onInput (e) {
      this.$emit('input', e)
    // console.log(e)
    },

    // 获取频道信息   -----    👇
    loadChannel () {
      // 需要传入token 只有有token的用户才能拿到数据，保护接口 否则401错误
      this.$http({
        url: '/channels', // 路径
        method: 'GET' // 请求类型
      })
        .then(res => {
          // 成功的话，可请求到参数
          this.channels = res.data.data.channels
        })
        .catch((err) => {
          // 登录错误 提示信息 登陆失败
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
