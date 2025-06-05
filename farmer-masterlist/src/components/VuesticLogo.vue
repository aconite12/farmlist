<template>
  <svg :height="height" :viewBox="`0 0 ${width + height} ${height}`" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="agroGradient" x1="0" x2="1" y1="0" y2="0">
        <stop :stop-color="colorsComputed.end" offset="0%" />
        <stop :stop-color="colorsComputed.start" offset="100%" />
      </linearGradient>
    </defs>

    <!-- Logo on the left -->
    <image x="0" y="0" :width="height" :height="height" href="./logo.webp" preserveAspectRatio="xMidYMid meet" />

    <!-- AgroConnect text to the right of the logo -->
    <text :x="height + 5" y="75%" :font-size="height * 0.65" font-weight="bold" font-family="sans-serif"
      fill="url(#agroGradient)">
      AgroConnect
    </text>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'

const { getColor } = useColors()

const props = withDefaults(
  defineProps<{
    height?: number
    start?: string
    end?: string
  }>(),
  {
    height: 40,
    start: '#4CAF50', // Default green color
    end: undefined,
  },
)

const colorsComputed = computed(() => ({
  start: getColor(props.start),
  end: getColor(props.end || props.start),
}))

// Estimate width based on text + spacing after the logo
const width = computed(() => 30 * "AgroConnect".length)
</script>
