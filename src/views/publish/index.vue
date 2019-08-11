<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId? '发布':'修改'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 使用选择图片组件 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
            <el-button type="primary" @click="submit(false)">发表</el-button>
            <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
            <el-button type="success" @click="update(false)">修改</el-button>
            <el-button @click="update(true)">存入草稿</el-button>
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
  // 挂载富文本组件
  components: {
    quillEditor
  },
  data () {
    return {
      // form表单数据
      articleForm: {
        channel_id: null,
        content: null,
        title: null,
        cover: {
          type: 1,
          images: []
        }
      },
      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      // 地址栏id
      articleId: null
    }
  },
  // 初始化完成的时候去获取一下地址如果获取到query.id，证明是修改页面如果获取不到就是发表页面
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      // 如果证明是修改文章 需要函数处理获取该文章的内容
      this.getArticle()
    }
  },
  watch: {
    // this.$route属于响应式数据，也可以在data中，所以也可以这么写 监听route事件
    $route () {
      if (!this.$route.query.id) {
        // 使地址栏的id重新变为空
        this.articleId = null
        // 使data表单中的数据重新初始化
        this.articleForm = {
          channel_id: null,
          content: null,
          title: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  },
  methods: {
    // 在修改状态下提交数据
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 在修改状态下获取数据
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 发表或存入草稿
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 当封面的选择项发生改变时应该先去清空已选择的图片
    changeType () {
      // console.log(11)
      this.articleForm.cover.images = []
    }
  }
}
</script>
<style lang="less" scoped>
</style>
