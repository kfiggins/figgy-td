import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@configs": path.resolve(__dirname, "src/configs"),
      "@enums": path.resolve(__dirname, "src/enums"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@screens": path.resolve(__dirname, "src/screens"),
    },
  },
});
