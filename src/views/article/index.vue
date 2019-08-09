<template>
  <div>
    <el-card>
      <!-- 赛选区域 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容部分 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="tableData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:120px;height:80px" fit="cover">
              <div slot="error">
                <img src="../../../public/images/error.gif" style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 page-size:每页几条 -->
      <div style="text-align:center;margin-top:30px;">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  created () {
    // 获取文章列表
    this.getArticles()
  },
  methods: {
    // 编辑文章
    edit (id) {
      // params 使路由规则改变了 所以需要query 传参
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`http://ttapi.research.itcast.cn/mp/v1_0/articles/${id}`)
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 时间改变事件
    changeDate (dateArr) {
      // dateArr [] 第一个起始时间  二是结束时间
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get(
        'http://ttapi.research.itcast.cn/mp/v1_0/articles',
        { params: this.reqParams }
      )
      this.tableData = data.results
      this.total = data.total_count
      // console.log(this.tableData)
    }
  },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 默认当前的页码
        page: 1,
        // 每页的文章数量
        per_page: 10
      },
      // 日期数据
      dateArr: [],
      // 文章列表数据
      tableData: [],
      // 总页数
      total: 0
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
