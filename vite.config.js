import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' permite abrir o build (dist) em qualquer pasta ou servidor estático
export default defineConfig({ base: './', plugins: [react()] })
