import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base './' works BOTH at a project path (yashmittal-git.github.io/diwali-quiz-night/)
// and at a custom subdomain root (e.g. diwaliparty.yashmittal.co.in) - no rebuild needed.
export default defineConfig({
    base: './',
    plugins: [react()],
});
