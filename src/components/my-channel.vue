<template>
<el-select :value="value" placeholder="请选择" clearable @input="fn">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</template>
<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 频道下拉数据
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    //   子传父
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get(
        'http://ttapi.research.itcast.cn/mp/v1_0/channels'
      )
      this.channelOptions = data.channels
      // console.log(data.channels)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
