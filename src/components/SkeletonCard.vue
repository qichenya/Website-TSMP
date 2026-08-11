<script setup>
/**
 * 骨架屏卡片组件
 * 在数据加载前显示，提供占位符效果
 */
</script>

<template>
  <div class="skeleton-card">
    <div class="skeleton-card__image skeleton-pulse"></div>
    <div class="skeleton-card__content">
      <div class="skeleton-card__title skeleton-pulse"></div>
      <div class="skeleton-card__text skeleton-pulse"></div>
      <div class="skeleton-card__text skeleton-pulse skeleton-card__text--short"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.skeleton-card {
  @include card-base;
  box-shadow: var(--md-sys-elevation-1);

  &__image {
    width: 100%;
    height: 160px;
  }

  &__content {
    padding: $spacing-md;
  }

  &__title {
    height: 20px;
    width: 60%;
    margin-bottom: $spacing-sm;
    border-radius: var(--md-sys-shape-corner-extra-small);
  }

  &__text {
    height: 14px;
    width: 90%;
    margin-bottom: $spacing-xs;
    border-radius: var(--md-sys-shape-corner-extra-small);

    &--short {
      width: 50%;
    }
  }
}

.skeleton-pulse {
  background: var(--md-sys-color-surface-container-highest);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}
</style>