<template>
  <div id="app-sandbox">
    <noscript>
      <strong>
      sandbox isn't turn on allow-script
      </strong>
    </noscript>
  </div>
</template>
<script lang="ts">
import { getQuestion } from '@/assets/questions'
import {defineComponent, onMounted, onUnmounted} from '@vue/composition-api'

function compileCode(src: string, global?: Record<string, any>) {
  let env = ''
  if (global) {
    Object.entries(global).forEach(([key, v]) => {
      env += `const ${key} = ${v.toString()}\n`
    })
  }
  const code = `${env};\n return (${src}).apply(null, args)`

  return new Function('args', code)
}

function receiveMessage(e: MessageEvent) {
  if (e.data.type !== 'solution test start') return
  const query: {level: QuestionDifficulty; id: string; solution: string} = e.data.data
  const config = getQuestion(query.level, query.id)
  const testCaseList: TestCase[] = config.testCase
  const solutionFunc = compileCode(query.solution, config.global).bind(config.global)
  const retList: TestResult[] = []
  testCaseList.forEach((test) => {
    const testCase = config.beforeSolution?.(test[0]) ?? test[0]
    const startTime = performance.now()
    const rawOutput = solutionFunc(testCase)
    const duration = performance.now() - startTime
    const ret = config.afterSolution?.(rawOutput) ?? rawOutput
    retList.push({
      input: test[0],
      output: ret,
      expect: test[1],
      // ms
      duration: duration,
    })
  })
  parent.postMessage(
    {
      type: 'solution test end',
      data: retList,
    },
    '*',
  )
}

const listenMessage = () => {
  
  onMounted(() => {
    window.addEventListener('message', receiveMessage, false)
  })
  onUnmounted(() => {
    window.removeEventListener('message', receiveMessage, false)
  })
  
}

export default defineComponent({
  name: 'AppSandbox',
  setup() {

    listenMessage()
    
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
