<template>
  <div>
    <el-container class="wrapper">
        <!-- 三元运算 是否展开 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <!-- logo -->
        <div class="logo" :class="{miniLogo:isCollapse}"></div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse = 'isCollapse'
          :collapse-transition = "false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-fold" @click="toggleMenu"></span>
          <span class="text">江苏传智播客科技有限公司</span>
          <!-- 下拉菜单 -->
          <el-dropdown class="my-dropdown">
            <span class="el-dropdown-link">
              <img :src="photo" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" @click.native="goLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import store from '@/store'
import eventBus from '@/components/eventbus'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    eventBus.$on('upDateName', (data) => {
      this.name = data
    })
    eventBus.$on('upDatePhoto', (data) => {
      this.photo = data
    })
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    //   切换侧边栏的收起与展开
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    goLogin () {
      store.clearUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="less" scoped>
// 全局的样式
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../../../public/images/logo_admin.png") no-repeat
        center / 140px auto;
    }
    .miniLogo {
        background-image: url('../../../public/images/logo_admin_01.png');
        background-size: 36px auto;
    }
    //   侧边栏样式
    .el-menu-vertical-demo{
        border-right: none;
    }
  }

  //   头部的样式
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: 700;
      }
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
}
</style>
