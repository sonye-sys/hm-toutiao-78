<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="image-btn" @click="openDialog">
      <img :src="value||pic" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 素材库内容 -->
          <el-radio-group v-model="reqParams.collect" size="mini" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="image-list">
            <div
              class="image-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImageUrl=item.url"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
            </div>
          </div>
          <el-pagination
            v-if="total > this.reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传文件" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
import pic from '../../public/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      //    tab选项激活谁
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      //   记录选中的图片地址
      selectedImageUrl: null,
      // 上传头部
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传成功的图片地址
      uploadImageUrl: null,
      pic
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      // 确认完毕后关闭对话框
      this.dialogVisible = false
    },
    // 上传图片预览
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    // 点击分页逻辑
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    //   切换全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 点击打开对话框
    openDialog () {
      this.dialogVisible = true
      // 清空上传或选中的图片地址
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.activeName = 'image'
      this.getImages()
    },
    // 获取素材列表数据
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style lang="less" scoped>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.image-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #dddddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  display: block;
  width: 100%;
  text-align: center;
}
.image-list {
  margin-top: 10px;
  .image-item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
    position: relative;
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url("../../public/images/selected.png")
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
</style>
