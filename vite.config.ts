import { defineConfig } from "vite";
import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/lib/index.ts"),
			name: "clara-plugin-novel",
			formats: ["es"],
			fileName: "main",
		},
		rollupOptions: {
			external: [/^@clara\/api\/.*/],
		},
		outDir: "dist",
		emptyOutDir: true,
	},
});
