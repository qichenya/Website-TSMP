import { gsap } from 'gsap'

/**
 * GSAP 通用动画工具函数
 * 封装常用的 GSAP 动画模式，方便在各组件中复用
 */

/**
 * 淡入上浮动画
 * @param {HTMLElement|Ref} el - 目标元素
 * @param {Object} options - 可选配置
 */
export function gsapFadeUp(el, options = {}) {
  const { delay = 0, yOffset = 40, duration = 0.8, ease = 'power3.out' } = options
  return gsap.fromTo(
    el,
    { opacity: 0, y: yOffset },
    { opacity: 1, y: 0, duration, delay, ease }
  )
}

/**
 * 批量淡入上浮（stagger）
 * @param {HTMLElement[]|NodeList} els - 目标元素列表
 * @param {Object} options - 可选配置
 */
export function gsapStaggerFadeUp(els, options = {}) {
  const { stagger = 0.1, yOffset = 40, duration = 0.6, ease = 'back.out(1.2)' } = options
  return gsap.fromTo(
    els,
    { opacity: 0, y: yOffset },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: els[0]?.parentElement,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  )
}

/**
 * 缩放入场
 * @param {HTMLElement|Ref} el - 目标元素
 * @param {Object} options - 可选配置
 */
export function gsapScaleIn(el, options = {}) {
  const { delay = 0, duration = 0.6, ease = 'back.out(1.4)' } = options
  return gsap.fromTo(
    el,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration, delay, ease }
  )
}

/**
 * Hover 抬升效果
 * 在组件的 mouseenter/mouseleave 事件中使用
 * @param {HTMLElement|Ref} el - 目标元素
 * @param {Object} options - 可选配置
 */
export function gsapHoverLift(el, options = {}) {
  const { liftY = -4, scale = 1.02, duration = 0.3 } = options

  function onEnter() {
    gsap.to(el, {
      y: liftY,
      scale,
      boxShadow: 'var(--md-sys-elevation-3)',
      duration,
      ease: 'power2.out'
    })
  }

  function onLeave() {
    gsap.to(el, {
      y: 0,
      scale: 1,
      boxShadow: 'var(--md-sys-elevation-1)',
      duration,
      ease: 'power2.out'
    })
  }

  return { onEnter, onLeave }
}

/**
 * 清理 GSAP Timeline
 * @param {gsap.core.Timeline} tl
 */
export function cleanupTimeline(tl) {
  if (tl) tl.kill()
}

/**
 * 清理 ScrollTrigger 列表
 * @param {ScrollTrigger[]} triggers
 */
export function cleanupScrollTriggers(triggers) {
  if (triggers && triggers.length) {
    triggers.forEach(t => t.kill())
  }
}