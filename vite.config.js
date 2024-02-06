import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "CalendarJB",
		short_name: "Calendar Ups",
		description: "Mi first project about a Calendar App.",
		icons: [
			{
				src: "/android-launchericon-192-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/android-launchericon-512-512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/SplashScreen.scale-200.png",
				sizes: "200x200",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/SplashScreen.scale-400.png",
				sizes: "400x400",
				type: "image/png",
				purpose: "any maskable",
			},
      {
        src: '/192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/512.png',
        sizes: '512x512',
        type: 'image/png'
      }
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugin,{
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
