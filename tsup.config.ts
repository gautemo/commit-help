import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/main.ts'],
	outDir: 'bin',
	splitting: false,
	format: 'esm',
	clean: true,
	treeshake: true,
	minify: true,
})
