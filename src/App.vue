<template>
  <p>comlink sample</p>
  <p>TIME: {{ counter }}</p>
  <button @click="runHeavyWebWorker">heavy func in web worker</button>
  <button @click="runHeavy">heavy func</button>
</template>

<script>
import { ref } from 'vue'
import { wrap } from 'comlink'

export default {
  name: 'App',
  setup() {
    let worker = null
    async function init() {
      const WorkerClass = wrap(new Worker('./worker.js'))
      worker = await new WorkerClass(0)
      console.log(`Counter: ${await worker.counter}`)
      await worker.increment()
      console.log(`Counter: ${await worker.counter}`)
      await worker.double()
      console.log(`Counter: ${await worker.counter}`)
    }

    init()

    const counter = ref(0)

    setInterval(() => {
      counter.value++
    }, 100)

    const runHeavy = async () => {
      let result = 0
      for (let i = 0; i < 1e9; i++) {
        result = i
      }
      console.log('finish', result)
    }

    const runHeavyWebWorker = async () => {
      await worker.heavyFunc()
    }

    return { counter, runHeavy, runHeavyWebWorker }
  },
}
</script>
