import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs';


// https://vitejs.dev/config/


export default defineConfig({
  plugins: [
    react(),
    commonjs({ transformMixedEsModules: true })

  ],

  build: { chunkSizeWarningLimit: 1500, },


  // https://vitejs.dev/config/#server-proxy
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:3000',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')  
  //   }
  // }

  // https://vitejs.dev/config/#server-proxy
  // proxy: {
  //   '/api': {



})








// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     // vite config{}
//     define: {
//       __APP_ENV__: env.APP_ENV,
//     },
//     plugins: [react()],
//   }
// })