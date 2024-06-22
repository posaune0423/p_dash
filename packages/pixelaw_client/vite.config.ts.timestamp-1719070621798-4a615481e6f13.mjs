// vite.config.ts
import { defineConfig } from "file:///Users/syora/workspace/crypto/aw/hackathon/p_dash/packages/pixelaw_client/node_modules/.pnpm/vite@5.3.1/node_modules/vite/dist/node/index.js";
import react from "file:///Users/syora/workspace/crypto/aw/hackathon/p_dash/packages/pixelaw_client/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.3.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import graphqlLoader from "file:///Users/syora/workspace/crypto/aw/hackathon/p_dash/packages/pixelaw_client/node_modules/.pnpm/vite-plugin-graphql-loader@3.0.1/node_modules/vite-plugin-graphql-loader/dist/index.js";
import wasm from "file:///Users/syora/workspace/crypto/aw/hackathon/p_dash/packages/pixelaw_client/node_modules/.pnpm/vite-plugin-wasm@3.3.0_vite@5.3.1/node_modules/vite-plugin-wasm/exports/import.mjs";
import topLevelAwait from "file:///Users/syora/workspace/crypto/aw/hackathon/p_dash/packages/pixelaw_client/node_modules/.pnpm/vite-plugin-top-level-await@1.4.1_vite@5.3.1/node_modules/vite-plugin-top-level-await/exports/import.mjs";
import { fileURLToPath, URL } from "url";
import { viteEnvs } from "file:///Users/syora/workspace/crypto/aw/hackathon/p_dash/packages/pixelaw_client/node_modules/.pnpm/vite-envs@4.3.2/node_modules/vite-envs/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/syora/workspace/crypto/aw/hackathon/p_dash/packages/pixelaw_client/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    graphqlLoader(),
    wasm(),
    topLevelAwait(),
    viteEnvs({
      declarationFile: ".env.example"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3lvcmEvd29ya3NwYWNlL2NyeXB0by9hdy9oYWNrYXRob24vcF9kYXNoL3BhY2thZ2VzL3BpeGVsYXdfY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3lvcmEvd29ya3NwYWNlL2NyeXB0by9hdy9oYWNrYXRob24vcF9kYXNoL3BhY2thZ2VzL3BpeGVsYXdfY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zeW9yYS93b3Jrc3BhY2UvY3J5cHRvL2F3L2hhY2thdGhvbi9wX2Rhc2gvcGFja2FnZXMvcGl4ZWxhd19jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGdyYXBocWxMb2FkZXIgZnJvbSBcInZpdGUtcGx1Z2luLWdyYXBocWwtbG9hZGVyXCI7XG5pbXBvcnQgd2FzbSBmcm9tIFwidml0ZS1wbHVnaW4td2FzbVwiO1xuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSBcInZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdFwiO1xuaW1wb3J0IHtmaWxlVVJMVG9QYXRoLCBVUkx9IGZyb20gJ3VybCc7XG5pbXBvcnQge3ZpdGVFbnZzfSBmcm9tICd2aXRlLWVudnMnXG5cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHJlYWN0KCksXG4gICAgICAgIGdyYXBocWxMb2FkZXIoKSxcbiAgICAgICAgd2FzbSgpLFxuICAgICAgICB0b3BMZXZlbEF3YWl0KCksXG4gICAgICAgIHZpdGVFbnZzKHtcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uRmlsZTogXCIuZW52LmV4YW1wbGVcIlxuICAgICAgICB9KVxuXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlksU0FBUSxvQkFBbUI7QUFDeGEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sVUFBVTtBQUNqQixPQUFPLG1CQUFtQjtBQUMxQixTQUFRLGVBQWUsV0FBVTtBQUNqQyxTQUFRLGdCQUFlO0FBTm1PLElBQU0sMkNBQTJDO0FBUzNTLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNMLGlCQUFpQjtBQUFBLElBQ3JCLENBQUM7QUFBQSxFQUVMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
