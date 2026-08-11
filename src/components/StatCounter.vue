<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

/**
 * 数字滚动计数器组件
 * 使用 GSAP 补间实现数字从 0 滚动到目标值
 */
const props = defineProps({
  targetValue: {
    type: Number,
    required: true
  },
  suffix: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 2
  }
})

const displayValue = ref(0)
let tween = null

onMounted(() => {
  tween = gsap.to({ val: 0 }, {
    val: props.targetValue,
    duration: props.duration,
    ease: 'power2.out',
    onUpdate: function () {
      displayValue.value = Math.round(this.targets()[0].val)
    }
  })
})

onBeforeUnmount(() => {
  if (tween) tween.kill()
})
</script>

<template>
  <span class="stat-counter">
    <span class="stat-counter__number">{{ displayValue }}</span>
    <span v-if="suffix" class="stat-counter__suffix">{{ suffix }}</span>
  </span>
</template>

<style scoped lang="scss">
.stat-counter {
  display: inline-flex;
  align-items: baseline;

  &__number {
    font-family: 'Roboto', sans-serif;
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    color: var(--md-sys-color-primary);
  }

  &__suffix {
    font-size: 32px;
    font-weight: 500;
    color: var(--md-sys-color-primary);
    margin-left: 2px;
  }
}
</style>