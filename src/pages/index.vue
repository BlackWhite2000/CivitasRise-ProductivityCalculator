<script>
import { ref } from 'vue'
import { dataJson } from '/public/data'

export default {
  setup() {
    const data = ref([])
    const selectedEng_1 = ref('黍')
    const selectedEng_2 = ref('葡萄')
    const inputQuantity_1 = ref()
    const article_ConversionQuantity = ref(0)
    const loading = ref(true)
    dataJson().then((res) => {
      data.value = res
      loading.value = false
    })

    function triggerCalculi() {
      if (!inputQuantity_1.value || !selectedEng_2.value)
        return
      const inputValue = parseFloat(inputQuantity_1.value)
      if (inputValue < 0) {
        inputQuantity_1.value = 0
        return
      }

      const article_1 = selectedEng_1.value
      const article_2 = selectedEng_2.value
      const article_1_Data = data.value.find(item_1 => item_1.Chs === article_1)
      const article_2_Data = data.value.find(item_2 => item_2.Chs === article_2)
      const article_1_Quantity = article_1_Data.CQM
      const article_2_Quantity = article_2_Data.CQM
      const article_Ratio = article_2_Quantity / article_1_Quantity
      article_ConversionQuantity.value = inputQuantity_1.value * article_Ratio
    }

    return {
      data,
      loading,
      selectedEng_1,
      selectedEng_2,
      inputQuantity_1,
      article_ConversionQuantity,
      triggerCalculi,
    }
  },
  methods: {
    swapSelections() {
      const temp = this.selectedEng_1
      this.selectedEng_1 = this.selectedEng_2
      this.selectedEng_2 = temp
      this.triggerCalculi()
    },
  },
}
</script>

<template>
  <div v-if="loading" class="loading-animation">
    <div class="loading-spinner" />
  </div>
  <div v-else class="h-80vh flex flex-col justify-center items-center">
    <div class="text-xl font-bold">
      CivitasRise 产能换算器
    </div>
    <div class="mt-2 mb-10 text-sm opacity-75">
      数据来源：群文件 items.xlsx 2022-11-16
    </div>
    <div class="flex justify-center items-center mb-8 lt-lg:flex-col">
      <input
        v-model.number="inputQuantity_1" min="0" placeholder="请输入数量" type="number" pattern="[0-9]+"
        class="border-1.5 pl-2 py-2 mr-4 lt-lg:(mr-0 mb-4)" @input="triggerCalculi"
      >
      <select v-model="selectedEng_1" class="border-1.5 px-6 py-2" @change="triggerCalculi">
        <template v-for="item_1 in data" :key="item_1.id">
          <option v-if="item_1.CQM" :value="item_1.Chs">
            {{ item_1.Chs }}
          </option>
        </template>
      </select>
      <button
        title="物品交换" i="mdi-rotate-3d-variant" class="icon-btn text-xl px-12 lt-lg:my-5"
        @click="swapSelections"
      />
      <select v-model="selectedEng_2" class="border-1.5 px-6 py-2" @change="triggerCalculi">
        <template v-for="item_2 in data" :key="item_2.id">
          <option v-if="item_2.CQM" :value="item_2.Chs">
            {{ item_2.Chs }}
          </option>
          template
        </template>
      </select>
    </div>
    <div v-if="inputQuantity_1">
      {{ inputQuantity_1 }}
      {{ selectedEng_1 }}
      =
      {{ article_ConversionQuantity }}
      {{ selectedEng_2 }}
    </div>
    <div v-else>
      <div v-if="inputQuantity_1 === 0">
        <span>
          输入框的值不允许为 0,
        </span>
        <span>
          请修改
        </span>
        <span v-if="inputQuantity_1 === 0">
          {{ selectedEng_1 }}
        </span>
        <span>
          的值
        </span>
      </div>
      <div v-else>
        请在
        <span v-if="!inputQuantity_1">
          {{ selectedEng_1 }}
        </span>
        的输入框里填写数量
      </div>
    </div>
    <button i="carbon-sun dark:carbon-moon" class="icon-btn mx-2 !outline-none mt-12" @click="toggleDark()" />
  </div>
</template>

<style>
.loading-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
