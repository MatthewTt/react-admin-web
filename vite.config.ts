import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from "unocss/vite";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@assets':resolve(__dirname, 'src/assets'),
            '@components': resolve(__dirname, 'src/components'),
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    },
    plugins: [
        react(),
        UnoCSS(),
    ],
})
