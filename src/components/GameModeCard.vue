<script setup>
/**
 * 单张游戏模式卡片组件
 * 展示图标、名称、版本标签、描述
 */
defineProps({
  mode: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="game-card">
    <!-- 图标区域 -->
    <div class="game-card__icon-area" :style="{ background: mode.color }">
      <span class="material-symbols-outlined game-card__icon">{{ mode.icon }}</span>
      <span class="game-card__version md3-label-medium">{{ mode.version }}</span>
    </div>

    <!-- 内容区域 -->
    <div class="game-card__content">
      <h3 class="game-card__name md3-title-medium">{{ mode.name }}</h3>
      <p class="game-card__desc md3-body-medium">{{ mode.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.game-card {
  @include card-base;
  box-shadow: var(--md-sys-elevation-1);
  cursor: pointer;
  will-change: transform;

  @include card-hover;

  &__icon-area {
    position: relative;
    height: 140px;
    @include flex-center;
    flex-direction: column;
    gap: $spacing-sm;
    overflow: hidden;
  }

  &__icon {
    font-size: 48px;
    color: white;
    position: relative;
    z-index: 1;
  }

  &__version {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
    color: white;
    padding: 2px 10px;
    border-radius: var(--md-sys-shape-corner-full);
    z-index: 1;
  }

  &__content {
    padding: $spacing-md $spacing-lg $spacing-lg;
  }

  &__name {
    color: var(--md-sys-color-on-surface);
    margin-bottom: $spacing-sm;
  }

  &__desc {
    color: var(--md-sys-color-on-surface-variant);
    @include text-ellipsis(3);
    line-height: 1.5;
  }
}
</style>