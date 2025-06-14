import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3333,
        proxy: {
            '/api': {
                target: 'http://sports.local:8088',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
