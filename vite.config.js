import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* import { createServer } from 'https'
import { readFileSync } from 'fs' */

export default defineConfig({
	plugins: [react()],

	optimizeDeps: {
		// 👈 optimizedeps
		esbuildOptions: {
			target: 'esnext',
			define: {
				global: 'globalThis',
			},
			supported: {
				bigint: true,
			},
		},
	},
	build: {
		chunkSizeWarningLimit: 100,
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
					return;
				}
				warn(warning);
			},
		},
		target: ['esnext'], // 👈 build.target
	},
	// server: {
	//   https: {
	//     key: readFileSync('key.pem'),
	//     cert: readFileSync('cert.pem'),
	//   }
	// }
});
