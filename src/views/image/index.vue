<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" @click="openDialog()" size="small" style="float:right">添加素材</el-button>
      </div>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-show="!reqParams.collect">
            <span class="el-icon-star-off" :class="{seleted:item.is_collected}" @click="toggleCollect(item)"></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
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
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //   素材列表
      images: [],
      //   图片总数
      total: 0,
      dialogVisible: false,
      //   上传成功后图片的地址
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    //   删除素材
    deleteImage (id) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //   切换收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '删除收藏成功')
      //    更新图片的状态即可
      item.is_collected = data.collect
    },
    //   上传图片成功的方法
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getData()
      }, 2000)
    },
    //   打开添加素材
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getData()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getData()
    },
    async getData () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      //   console.log(this.images)
    }
  }
}
</script>
<style lang="less" scoped>
.img-list {
  margin-top: 20px;
}
.img-item {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  position: relative;
  display: inline-block;
  margin: 0 30px 30px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    span {
      margin: 0 20px;
      &.seleted {
        color: red;
      }
    }
  }
}
</style>
