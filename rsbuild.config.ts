import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import TanStackRouterRspack from "@tanstack/router-plugin/rspack";

export default defineConfig({
	plugins: [pluginReact()],
	tools: {
		rspack: {
			plugins: [
				TanStackRouterRspack({ target: "react", autoCodeSplitting: true }),
			],
		},
	},
	html: {
		title: "Quibe - 퀴베 코딩 챌린지",
		tags: [
			{
				tag: "link",
				attrs: {
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
			},
			{
				tag: "link",
				attrs: {
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png",
				},
			},
			{
				tag: "link",
				attrs: {
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon-16x16.png",
				},
			},
			{
				tag: "link",
				attrs: { rel: "manifest", href: "/site.webmanifest" },
			},
			{
				tag: "link",
				attrs: { rel: "shortcut icon", href: "/favicon.ico" },
			},
		],
	},
});
