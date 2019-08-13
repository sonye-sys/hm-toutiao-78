<template>
  <div class="setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="3" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import store from '@/store'
import eventBus from '@/components/eventbus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        id: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserform()
  },
  methods: {
    myUpload (result) {
      const formdata = new FormData()
      formdata.append('photo', result.file)
      this.$http.patch('user/photo', formdata).then(res => {
        //   成功提示
        this.$message.success('设置头像成功')
        // 实现预览
        this.userForm.photo = res.data.data.photo
        // 保存到本地
        store.setUser({ photo: this.userForm.photo })
        // 更新home头像
        eventBus.$emit('upDatePhoto', this.userForm.photo)
      })
    },
    async saveUserInfo () {
      await this.$http.patch('user/profile', { name: this.userForm.name, intro: this.userForm.intro, email: this.userForm.email })
      //   1 提示设置成功
      this.$message.success('设置成功')
      // 2.保存到本地
      store.setUser({ name: this.userForm.name })
      // 3.更新到home页
      eventBus.$emit('upDateName', this.userForm.name)
    },
    async getUserform () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    }
  }
}
</script>
<style lang="less" scoped>
</style>
