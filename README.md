# Trystage 服务器宣传网站

> 基于 Vue 3 + GSAP + Material Design 3 的 Minecraft 服务器多页面宣传网站

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock)](https://gsap.com/)
[![Material Design](https://img.shields.io/badge/Material%20Design-3-6750A4?logo=materialdesign)](https://m3.material.io/)

## 🎮 服务器信息

| 项目 | 内容 |
|------|------|
| 名称 | **Trystage** |
| IP | `mc.trystage.cn` |
| QQ群 | **649523125** |
| 版本 | 1.8 — 1.21 |
| 费用 | 完全免费，无氪金 |

## 🕹️ 游戏模式

| 模式 | 版本 |
|------|------|
| 起床战争 · 经典 | 1.8 |
| 经验起床 · Modern | 1.20 |
| 2B2T | 1.20 |
| 空岛战争 | 1.20 |
| 自救练习 | 1.8 |
| 竞技场决斗 | 1.8 / 1.21 |
| 技巧练习 | 1.8 |
| 击退大乱斗 | 1.8 |

## 🏗️ 技术栈

- **框架**: Vue 3 (Composition API, `<script setup>`)
- **构建**: Vite 6
- **动画**: GSAP 3.x (ScrollTrigger)
- **UI规范**: Material Design 3 (动态色彩 + 深色/浅色主题)
- **路由**: Vue Router 4 (嵌套路由 + 懒加载)
- **状态管理**: Pinia (主题持久化)
- **样式**: SCSS + CSS Variables

## 📁 项目结构

```
src/
├── main.js                    # 入口
├── App.vue                    # 根组件（骨架屏 + 页面过渡）
├── router/index.js            # 路由配置
├── layouts/
│   └── DefaultLayout.vue      # 共享布局（AppBar + Footer）
├── views/
│   ├── HomeView.vue           # 首页（Hero）
│   ├── GameModesView.vue      # 游戏模式
│   ├── VersionsView.vue       # 版本支持
│   ├── StatsView.vue          # 项目实力
│   └── JoinView.vue           # 加入我们
├── components/
│   ├── AppBar.vue             # 导航栏
│   ├── AppFooter.vue          # 页脚
│   ├── HeroSection.vue        # Hero 区
│   ├── GameModesSection.vue   # 游戏模式区
│   ├── GameModeCard.vue       # 模式卡片
│   ├── VersionSupport.vue     # 版本支持区
│   ├── StatsSection.vue       # 统计区
│   ├── StatCounter.vue        # 数字滚动
│   ├── ThemeToggle.vue        # 主题切换
│   ├── ScrollToTop.vue        # 回到顶部
│   ├── SectionTitle.vue       # 通用标题
│   └── SkeletonCard.vue       # 骨架屏
├── composables/
│   ├── useGsap.js             # GSAP 动画工具
│   ├── useScrollTrigger.js    # 滚动触发
│   ├── useCountUp.js          # 数字滚动
│   └── useMediaQuery.js       # 响应式断点
├── data/
│   ├── gameModes.js           # 游戏模式数据
│   ├── versionData.js         # 版本数据
│   └── statsData.js           # 统计指标数据
├── stores/
│   └── theme.js               # 主题 Store
└── styles/
    ├── theme.css              # MD3 色彩系统
    ├── _variables.scss        # SCSS 变量
    ├── _mixins.scss           # SCSS 混入
    ├── _typography.scss       # 字体层级
    └── global.scss            # 全局样式
```

## 📄 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 品牌展示、IP 复制、QQ群、CTA 入口 |
| `/game-modes` | 游戏模式 | 8 种游戏模式卡片网格 |
| `/versions` | 版本支持 | 1.8 / 1.20 / 1.21 三版本展示 |
| `/stats` | 项目实力 | 60+ 开源项目、API、机器人统计 |
| `/join` | 加入我们 | IP、QQ群、4 步加入指引 |

## 🎨 特性

- **Material Design 3** 动态色彩系统，支持深色/浅色主题切换
- **GSAP 动画**: 页面入场动画、滚动触发动画、卡片 hover 微交互、页面切换过渡
- **响应式设计**: 移动端/平板/桌面多断点适配
- **毛玻璃效果**: Hero 区 IP 盒子使用 `backdrop-filter` 半透明设计
- **骨架屏**: 首次加载展示骨架屏，提升感知性能
- **路由懒加载**: 各页面独立代码分割

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📄 许可证

MIT License

---

© 2026 StarAir Co., LTD · Trystage 服务器 | 蜀ICP备2024111382号