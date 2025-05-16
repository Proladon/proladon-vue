import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...UnoCSS options
  rules: [
    ['w-fit', { width: 'fit-content' }],
    ['h-fit', { height: 'fit-content' }]
  ],
  theme: {},
  transformers: [transformerVariantGroup(), transformerDirectives()]
})
