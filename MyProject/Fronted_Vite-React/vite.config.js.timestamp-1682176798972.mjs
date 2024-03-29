// vite.config.js
import { defineConfig, loadEnv } from "file:///D:/TU_Project/MyProject/Fronted_Vite-React/node_modules/vite/dist/node/index.js";
import react from "file:///D:/TU_Project/MyProject/Fronted_Vite-React/node_modules/@vitejs/plugin-react/dist/index.mjs";
import commonjs from "file:///D:/TU_Project/MyProject/Fronted_Vite-React/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    commonjs({ transformMixedEsModules: true })
  ],
  build: { chunkSizeWarningLimit: 1500 },
  // server: {
  //   port: 8081
  // },

});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUVV9Qcm9qZWN0XFxcXE15UHJvamVjdFxcXFxGcm9udGVkX1ZpdGUtUmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRVX1Byb2plY3RcXFxcTXlQcm9qZWN0XFxcXEZyb250ZWRfVml0ZS1SZWFjdFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVFVfUHJvamVjdC9NeVByb2plY3QvRnJvbnRlZF9WaXRlLVJlYWN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBjb21tb25qcyBmcm9tICdAcm9sbHVwL3BsdWdpbi1jb21tb25qcyc7XG5cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjb21tb25qcyh7IHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlIH0pXG5cbiAgXSxcblxuICBidWlsZDogeyBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsIH0sXG5cblxuICAvLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnLyNzZXJ2ZXItcHJveHlcbiAgLy8gcHJveHk6IHtcbiAgLy8gICAnL2FwaSc6IHtcbiAgLy8gICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gIC8vICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpICBcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnLyNzZXJ2ZXItcHJveHlcbiAgLy8gcHJveHk6IHtcbiAgLy8gICAnL2FwaSc6IHtcblxuXG5cbn0pXG5cblxuXG5cblxuXG5cblxuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuLy8gICAvLyBMb2FkIGVudiBmaWxlIGJhc2VkIG9uIGBtb2RlYCBpbiB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS5cbi8vICAgLy8gU2V0IHRoZSB0aGlyZCBwYXJhbWV0ZXIgdG8gJycgdG8gbG9hZCBhbGwgZW52IHJlZ2FyZGxlc3Mgb2YgdGhlIGBWSVRFX2AgcHJlZml4LlxuLy8gICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKVxuLy8gICByZXR1cm4ge1xuLy8gICAgIC8vIHZpdGUgY29uZmlne31cbi8vICAgICBkZWZpbmU6IHtcbi8vICAgICAgIF9fQVBQX0VOVl9fOiBlbnYuQVBQX0VOVixcbi8vICAgICB9LFxuLy8gICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbi8vICAgfVxuLy8gfSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXdULFNBQVMsY0FBYyxlQUFlO0FBQzlWLE9BQU8sV0FBVztBQUNsQixPQUFPLGNBQWM7QUFNckIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxFQUFFLHlCQUF5QixLQUFLLENBQUM7QUFBQSxFQUU1QztBQUFBLEVBRUEsT0FBTyxFQUFFLHVCQUF1QixLQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtCeEMsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
