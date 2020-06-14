<template>
  <el-container class="main-layout">
    <el-aside width="225px">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-openeds="['simple']"
        :default-active="state.active"
        router
      >
        <el-menu-item index="">
          Home
        </el-menu-item>
        <el-submenu
          v-for="(sub, level) in state.menu"
          :key="level"
          :index="'/problems/' + level"
        >
          <template slot="title">
            <span>{{ level }}</span>
          </template>
          <el-menu-item
            v-for="(q, name) in sub"
            :key="q.id"
            :index="'/problems/' + level + '/' + name"
          >
            {{ name }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        leet code
      </el-header>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from '@vue/composition-api'
import { questions } from '@/assets/questions'


const MainLayout = defineComponent({
  name: 'MainLayout',
  setup() {
    const vm = getCurrentInstance()!
    
    const state = reactive({
      active: vm.$route.params.id,
      menu: questions,
    })
    return {
      state,
      // selectMenu(index: string) {
      //   // console.log('index', index)
      //   // if (state.active === index) { return }
      //   // vm.$router.push({name: 'problems', params: {index}})
      // },
    }
  },
})
export default MainLayout
</script>

<style lang="less" scoped>
.main-layout {
  min-height: 100vh;
  .el-aside {
    display: flex;
    flex-direction: column;
    .el-menu {
      flex: 1 1 auto;
    }
  }
}
</style>
