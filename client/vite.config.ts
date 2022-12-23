import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ui/",
  build: {
    target: ['es2015']
  },
  plugins: [react(
    // {
    //   babel: {
    //     // Use .babelrc files
    //     babelrc: true,
    //     // Use babel.config.js files
    //     configFile: true,
    //   }
    // }
  ),
  legacy({
    targets: ['defaults', 'not IE 11'],
  }),
],
})
