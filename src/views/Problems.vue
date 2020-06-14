<template>
  <div class="wrapper">
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
        :type="key === state.activeName ? 'success' : ''"
        @click="() => changeSolution(key)"
      >
        {{ key }}
      </el-tag>
    </div>
    <div>
      <p>
        <el-button
          type="primary"
          @click="run"
        >
          run
        </el-button>
      </p>
      <div v-if="result.error || result.pass > 0">
        <p v-if="result.pass > 0">
          PASS <span>cost: {{ result.pass.toFixed(4) }}ms</span>
        </p>
        <div v-else>
          <p>duration: {{ result.error.duration }}</p>
          <p>input: {{ result.error.input }}</p>
          <p>output: {{ result.error.output }}</p>
          <p>exprect: {{ result.error.expect }}</p>
        </div>
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
import { defineComponent, computed, reactive, onMounted, ref, onUnmounted } from '@vue/composition-api'
import { getQuestion } from '../assets/questions'

interface TestResult {
  duration: number
  expect: any
  input: any
  output: any
}

interface Result {
  pass: number
  error: TestResult
}


const listenMessage = (): Result  => {
  const result = reactive<Result>({pass: -1} as any)
  const receive = (e: MessageEvent) => {
    if (e.data.type !== 'solution test end') return
    const data: TestResult[] = e.data.data
    result.error = data.find(item => JSON.stringify(item.output) !== JSON.stringify(item.expect))!
    if (result.error) {
      result.pass = -1
    } else {
      result.pass = data.reduce((ret, item) => {
        return ret + item.duration
      }, 0) / data.length
    }
  }
  onMounted(() => {
    window.addEventListener('message', receive,false)
  })
  onUnmounted(() => {
    window.removeEventListener('message', receive,false)
  })
  return result
}


const Problems = defineComponent({
  name: 'Problems',
  props: {
    level:{ type: String, default: ''},
    id: { type: String, default: ''},
  },
  setup(prop) {
    const question = computed(() =>({...getQuestion(prop.level, prop.id)}))
    const state = reactive({
      activeName: '',
      solution: '',
    })
    const iframe = ref<HTMLIFrameElement>(null!)
    onMounted(() => {
      const solutions = Object.entries(question.value.solutions)
      state.activeName = solutions[0][0]
      state.solution = solutions[0][1].toString()
    })
    
    return {
      result: listenMessage(),
      iframe,
      state,
      question,
      changeSolution(name: string) {
        state.activeName = name
        state.solution = question.value.solutions[name].toString()
      },
      run() {
        iframe.value.contentWindow!.postMessage({
          type: 'solution test start',
          data: {
            solution: state.solution,
            testCase: question.value.testCase,
          },
        }, 'http://localhost:8080')
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
