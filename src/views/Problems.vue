<template>
  <div class="wrapper">
    <p>{{ question.id }}. {{ id }}</p>
    <pre class="desc">
      
      {{ question.desc }}
    </pre>
    <div class="content-wrapper">
      <el-input
        v-model="state.solution"
        type="textarea"
        :autosize="{ minRows: 2}"
      />
    </div>
    <div>
      <el-tag
        v-for="(s, key) in question.solutions"
        :key="key"
        :type="key === state.activeName ? '' : 'info'"
        @click="() => changeSolution(key)"
      >
        {{ key }}
      </el-tag>
    </div>
    <div>
      <p>
        <el-button
          type="primary"
          :disabled="!state.solution"
          @click="run"
        >
          run
        </el-button>
      </p>
      <div v-if="state.result.pass > 0">
        <p>
          PASS <span>cost: {{ state.result.pass.toFixed(4) }}ms</span>
        </p>
      </div>
      <div v-if="state.result.error">
        <p style="color: red;">
          Fail
        </p>
        <p>duration: {{ state.result.error.duration }}</p>
        <p>input: {{ state.result.error.input }}</p>
        <p>output: {{ state.result.error.output }}</p>
        <p>exprect: {{ state.result.error.expect }}</p>
      </div>
    </div>
    <div class="comment">
      {{ question.comment || 'no comment~' }}
    </div>
    <iframe
      ref="iframe"
      style="position: absolute; left: -9999px;"
      sandbox="allow-scripts allow-same-origin"
      src="/sandbox.html"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, onMounted, ref, onUnmounted, watchEffect, watch } from '@vue/composition-api'
import { getQuestion } from '../assets/questions'

interface TestResult {
  duration: number
  expect: any
  input: any
  output: any
}

interface Result {
  pass: number
  error?: TestResult | null
}



const Problems = defineComponent({
  name: 'Problems',
  props: {
    level:{ type: String, default: ''},
    id: { type: String, default: ''},
  },
  setup(prop) {
    const question = computed(() =>({...getQuestion(prop.level as QuestionDifficulty, prop.id)}))
    const state = reactive({
      activeName: '',
      solution: '',
      result: {pass: -1} as Result,
    })
    const iframe = ref<HTMLIFrameElement>(null!)

    const changeSolution = (name?: string): void => {
      state.activeName = name || 'default'
      state.solution = question.value.solutions[state.activeName].toString().replace(/^[\s]{4}/mg, '')
      state.result = {pass: -1}
    }

    watch(prop, () => {
      changeSolution()
    }, {immediate: true})

    onMounted(() => {
      // listen message
      const receive = (e: MessageEvent) => {
        if (e.data.type !== 'solution test end') return
        const data: TestResult[] = e.data.data
        const error = data.find(item => JSON.stringify(item.output) !== JSON.stringify(item.expect))
        // reactive 只能识别到第一层
        state.result = error ? {
          error,
          pass: -1,
        } : {
          pass: data.reduce((ret, item) => {
            return ret + item.duration
          }, 0) / data.length,
        }
      }
      window.addEventListener('message', receive, false)
      onUnmounted(() => {
        window.removeEventListener('message', receive, false)
      })
    })
    
    return {
      state,
      iframe,
      question,
      changeSolution,
      run() {
        iframe.value.contentWindow!.postMessage({
          type: 'solution test start',
          data: {
            level: prop.level,
            id: prop.id,
            solution: state.solution.toString(),
          },
        }, '*')
      },
    }
  },
})

export default Problems
</script>

<style lang="less" scoped>
.wrapper {
  .el-tag {
    margin-top: 10px;
    cursor: pointer;
    & + .el-tag {
      margin-left: 10px;
    }
  }
  .comment {
    margin-top: 50px;
  }
}
</style>
