import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

/**
 * 数字滚动动画 Composable
 * 使用 GSAP 补间实现数字从 0 滚动到目标值
 *
 * @param {Object} options
 * @param {number} options.targetValue - 目标值
 * @param {number} options.duration - 持续时间（秒）
 * @param {string} options.ease - 缓动函数
 * @returns {{ displayValue: Ref<number> }}
 */
export function useCountUp(options = {}) {
  const {
    targetValue = 0,
    duration = 2,
    ease = 'power2.out'
  } = options

  const displayValue = ref(0)
  let tween = null

  function startCount() {
    tween = gsap.to({ val: 0 }, {
      val: targetValue,
      duration,
      ease,
      onUpdate: function () {
        displayValue.value = Math.round(this.targets()[0].val)
      }
    })
  }

  onMounted(() => {
    startCount()
  })

  onBeforeUnmount(() => {
    if (tween) tween.kill()
  })

  return {
    displayValue,
    startCount
  }
}