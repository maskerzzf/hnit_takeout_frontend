import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    //引入vantui
    Components({
      resolvers: [VantResolver()],
    }),],
    server:{
      open: true,
      proxy: { 
        '/api': {
          target: 'http://localhost:8080/',  //你要跨域访问的网址
          changeOrigin: true,   // 允许跨域
          rewrite: (path: string) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
      }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }

   
}
)


