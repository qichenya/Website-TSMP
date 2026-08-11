<script setup>
/**
 * 底部 Footer 组件
 * 展示版权信息和 ICP 备案号
 */
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__container">
      <div class="app-footer__brand">
        <span class="app-footer__logo">Trystage</span>
        <span class="app-footer__divider">·</span>
        <span>完全免费 · 无氪金</span>
      </div>
      <div class="app-footer__info">
        <p class="md3-body-small">© 2026 StarAir Co., LTD · Trystage 服务器</p>
        <a
          class="app-footer__icp md3-body-small"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          蜀ICP备2024111382号
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.app-footer {
  background-color: var(--md-sys-color-surface-container);
  border-top: 1px solid var(--md-sys-color-outline-variant);
  padding: $spacing-xl $spacing-lg;

  &__container {
    @include container;
    @include flex-column;
    align-items: center;
    gap: $spacing-md;
    text-align: center;
  }

  &__brand {
    @include flex-center;
    flex-wrap: wrap;
    gap: $spacing-xs;
    color: var(--md-sys-color-on-surface-variant);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
  }

  &__logo {
    font-weight: 700;
    color: var(--md-sys-color-primary);
  }

  &__divider {
    color: var(--md-sys-color-outline-variant);
  }

  &__info {
    @include flex-column;
    align-items: center;
    gap: $spacing-xs;
    color: var(--md-sys-color-on-surface-variant);
  }

  &__icp {
    color: var(--md-sys-color-on-surface-variant);
    transition: color 0.2s ease;

    &:hover {
      color: var(--md-sys-color-primary);
    }
  }
}
</style>