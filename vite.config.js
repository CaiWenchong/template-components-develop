import {
	defineConfig
} from 'vite';

// uni自身插件
import uni from '@dcloudio/vite-plugin-uni';

// uview-plus 需要的插件
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
	server: {
		proxy: {
			/*      '/api': {
			        target: 'http://127.0.0.1:8000/api',
			        changeOrigin: true,
			        rewrite: (path) => path.replace(/^\/api/, ''),
			      }, */
		},
	},
	alias: {
		'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
	},
	plugins: [uni(), commonjs()],
});
