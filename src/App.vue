<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import {defineComponent} from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  setup() {
    return {}
  },
})
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
}
</style>
