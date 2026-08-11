# Vue 3 + GSAP 动效 + Material Design 3 网页 UI 开发 Prompt

> 适用场景：使用 AI 辅助生成完整页面或组件  
> 技术栈：Vue 3 (Composition API)、GSAP (含 ScrollTrigger)、Material Design 3

---

## 一、项目概述

请使用 **Vue 3（Composition API）**、**GSAP 动画库** 和 **Material Design 3（MD3）** 设计规范，开发一个完整的 **[页面类型，例如：产品展示页 / 个人仪表盘 / 品牌落地页]**。整体风格需符合 MD3 的动态色彩、圆角、质感与层次感，并通过 GSAP 实现流畅、富有细节的入场与交互动画。

---

## 二、技术栈要求

| 类别 | 技术选型 |
|------|----------|
| 框架 | Vue 3（`<script setup>` 语法） |
| 动画引擎 | GSAP 3.x（含 ScrollTrigger 插件） |
| UI 规范 | Material Design 3（动态色彩、M3 组件风格） |
| 样式方案 | 可选：SCSS / CSS Variables / Tailwind（需搭配 MD3 主题） |
| 字体与图标 | Google Material Icons / Material Symbols + Roboto 字体 |

---

## 三、功能与交互要求

### 1. 页面结构（至少包含以下区块）
- **顶部导航栏**：符合 MD3 Top App Bar 样式，含品牌 Logo、导航链接、操作按钮（如搜索、主题切换）。
- **Hero 区域**：大标题、描述文字、CTA 按钮，背景可含渐变或模糊玻璃态（M3 推荐风格）。
- **内容卡片区**：使用 MD3 Card 组件展示多个条目（如功能特点、文章列表、产品信息），每张卡片需含图片占位、标题、描述和操作按钮。
- **数据可视化 / 统计区**：展示数字指标或进度环，风格贴合 MD3 的「表面」与「强调色」。
- **底部 Footer**：含版权信息、社交链接、法律条款等。

### 2. 交互与状态
- 支持 **深色 / 浅色主题切换**，使用 CSS Variables 实现 MD3 动态色彩系统。
- 导航栏在滚动时产生 **收缩 / 阴影变化** 效果（GSAP 控制）。
- 卡片在鼠标悬停时有 **微抬升 + 阴影变化** 的动效（GSAP 或 CSS + GSAP 结合）。
- 页面加载时，各区块按顺序 **依次淡入上浮**（GSAP 时间线控制）。

---

## 四、GSAP 动画详细规范

1. **页面入场动画**（页面加载时触发）
   - Hero 区域文字逐字或逐行出现（`SplitText` 或自定义）。
   - 卡片依次从底部淡入上浮，带有弹性缓动（`ease: "back.out(1.2)"`）。
   - 统计数字从 0 滚动到目标值（使用 GSAP `animate` 或自定义补间）。

2. **滚动触发动效**（使用 `ScrollTrigger`）
   - 卡片区在进入视口时触发入场动画。
   - 某个关键元素（如 CTA 按钮）在滚动过程中产生视差或缩放效果。
   - 进度指示器随滚动更新。

3. **微交互动效**
   - 按钮点击时产生“涟漪”效果（MD3 原生可用，或通过 GSAP 增强）。
   - 导航菜单项 hover 时下划线平滑滑动。
   - 主题切换时，背景与卡片颜色进行 **平滑过渡**（GSAP 插值）。

---

## 五、Material Design 3 风格细节

- **色彩系统**：使用 `@material/material-color-utilities` 或手动定义 CSS Variables，包含 `primary`、`onPrimary`、`surface`、`surfaceVariant`、`outline` 等。
- **圆角**：遵循 MD3 圆角令牌（`shape.corner.small`、`medium`、`large`）。
- **字体层级**：使用 MD3 类型系统（Display / Headline / Title / Label / Body）。
- **组件风格**：按钮使用 Filled / Outlined / Text 三种变体；卡片使用 Elevated / Filled / Outlined 风格。
- **动效节奏**：遵循 MD3 动效时长与缓动曲线（标准加速、减速、强调加速等）。

---

## 六、代码质量与工程规范

- 组件采用 **单一职责原则**，合理拆分（如 `AppBar.vue`、`HeroSection.vue`、`CardGrid.vue`、`StatsSection.vue`、`AppFooter.vue`）。
- 使用 Vue 的 `onMounted`、`onBeforeUnmount` 管理 GSAP 动画生命周期，确保销毁时清理 `ScrollTrigger` 和 `timeline`。
- 主题切换状态使用 `Pinia` 或 `provide/inject` 全局管理。
- 响应式设计：支持移动端、平板、桌面断点（MD3 栅格系统或 CSS Grid/Flexbox）。
- 代码中包含必要的注释，方便二次修改。

---

## 七、交付物要求

请输出以下内容：

1. **完整的项目结构树**（含主要组件文件）
2. **主页面组件代码**（`App.vue` 及核心子组件）
3. **全局主题样式文件**（`theme.css` 或 `variables.scss`）
4. **GSAP 动画配置独立文件**（`animations.js` 或 `useGsap.js` composable）
5. **主题切换逻辑**（浅色/深色模式切换）

---

## 八、额外加分项（可选）

- 使用 `vue-router` 实现多页切换动画（GSAP 过渡）。
- 使用 `@vueuse/core` 的 `useIntersectionObserver` 辅助触发动画。
- 添加加载骨架屏（Skeleton）效果，并在数据加载完成后播放入场动画。

---

## 九、示例代码片段（供参考结构）

```vue
<!-- HeroSection.vue 示例 -->
<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const titleRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  })
  
  tl.fromTo(titleRef.value, { scale: 1 }, { scale: 0.9, duration: 1 })
})
</script>