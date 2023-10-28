import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ui/",
  //build: {
  //  target: []
  //},
  plugins: [
    react(),
    legacy({
      // for ie11
      targets: [
        "ie >= 0",
        '> 0%'
      ],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      polyfills: true
    }),
  ],
})
