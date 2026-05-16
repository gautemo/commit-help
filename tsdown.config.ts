import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: ['src/main.ts'],
	outDir: 'bin',
	minify: true,
	dts: false,
	target: false,
	outExtensions: () => ({ js: '.js' }),
})
