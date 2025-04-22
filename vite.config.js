// vite.config.js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: false, // 禁用开发模式下的 workbox, 这会和 hmr 冲突, 而且没用
            },
            workbox: {
                globPatterns: ['**/*.{mjs,js,css,html,png,jpg,gif,svg,woff,woff2}'], // 需要缓存的静态资源文件类型, 默认为 **/*.{js,css,html}
            },
            // includeAssets: ['非 public 文件夹下的文件'], // 额外需要缓存的文件
            manifest: false
        }),
    ],
    base: '/pwa-str-separate/'
})
