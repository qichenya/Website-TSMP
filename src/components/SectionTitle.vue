<script setup>
/**
 * 通用区块标题组件
 * 遵循 MD3 字体层级，带有装饰性下划线
 */
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="section-title">
    <h2 class="section-title__heading md3-headline-large">{{ title }}</h2>
    <div class="section-title__underline"></div>
    <p v-if="subtitle" class="section-title__subtitle md3-body-large">{{ subtitle }}</p>
  </div>
</template>

<style scoped lang="scss">
.section-title {
  text-align: center;
  margin-bottom: $spacing-2xl;

  &__heading {
    color: var(--md-sys-color-on-surface);
    margin-bottom: $spacing-md;
  }

  &__underline {
    width: 48px;
    height: 4px;
    background: var(--md-sys-color-primary);
    border-radius: var(--md-sys-shape-corner-full);
    margin: 0 auto $spacing-lg;
  }

  &__subtitle {
    color: var(--md-sys-color-on-surface-variant);
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>