import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTrigger 封装 Composable
 * 提供常用的滚动触发动画模式
 */

/**
 * 创建滚动淡入动画
 * 当元素进入视口时触发淡入上浮
 * @param {HTMLElement|Ref} trigger - 触发器元素
 * @param {HTMLElement|Ref} target - 动画目标元素
 * @param {Object} options - 可选配置
 * @returns {ScrollTrigger}
 */
export function useScrollFadeIn(trigger, target, options = {}) {
  const {
    start = 'top 85%',
    yOffset = 40,
    duration = 0.8,
    ease = 'power3.out'
  } = options

  return ScrollTrigger.create({
    trigger,
    start,
    toggleActions: 'play none none none',
    onEnter: () => {
      gsap.fromTo(
        target,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration, ease }
      )
    }
  })
}

/**
 * 创建滚动视差效果
 * @param {HTMLElement|Ref} trigger - 触发器
 * @param {HTMLElement|Ref} target - 视差目标
 * @param {Object} options - 可选配置
 * @returns {ScrollTrigger}
 */
export function useScrollParallax(trigger, target, options = {}) {
  const { speed = 0.5, start = 'top top', end = 'bottom top' } = options

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub: 1,
    onUpdate: (self) => {
      const y = self.progress * 100 * speed
      gsap.set(target, { y: -y })
    }
  })
}

/**
 * 创建滚动进度动画
 * 根据滚动进度更新回调
 * @param {HTMLElement|Ref} trigger - 触发器
 * @param {Function} onUpdate - 进度回调 (progress: 0-1)
 * @param {Object} options - 可选配置
 * @returns {ScrollTrigger}
 */
export function useScrollProgress(trigger, onUpdate, options = {}) {
  const { start = 'top bottom', end = 'bottom top' } = options

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    onUpdate: (self) => {
      onUpdate(self.progress)
    }
  })
}