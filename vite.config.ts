import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/BattleMaisonSearch/',
    plugins: [react()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            public: path.resolve(__dirname, './public'),
        },
    },
});
