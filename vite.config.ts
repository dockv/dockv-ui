/**
 * Vite 构建配置
 *
 * 构建产物：
 * - dockv-ui.es.js    ES 格式（external lit / iconify，供 npm 打包器用户 tree-shaking）
 * - dockv-ui.umd.js   UMD 格式（自包含 lit / iconify，供 <script> 直引开箱即用）
 */

import { defineConfig, type UserConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";

const entry = resolve(import.meta.dirname, "src/index.ts");

// 共享依赖清单：从 package.json 的 peerDependencies 读取，
// external 规则必须与之一一对应，以后加新共享依赖只需改 package.json 一处。
const peerDeps: string[] = Object.keys(
  JSON.parse(readFileSync(resolve(import.meta.dirname, "package.json"), "utf-8"))
    .peerDependencies ?? {},
);

/**
 * 判定需外置的运行时依赖（与 peerDependencies 保持一致）
 * @param id 模块的 import 源字符串
 * @returns 是否外置
 */
function externalize(id: string): boolean {
  // 匹配主包及其子路径（如 lit、lit/decorators.js、@iconify/iconify）
  return peerDeps.some((dep) => id === dep || id.startsWith(dep + "/"));
}

/** ES 产物：给 npm 打包器用户，lit / iconify 由用户项目提供，避免重复打包 */
const esConfig: UserConfig = {
  build: {
    lib: {
      entry,
      formats: ["es"],
      fileName: () => "dockv-ui.es.js",
    },
    minify: "esbuild", // 使用 ESbuild 进行压缩
    sourcemap: false, // 发布时不生成 *.map.js 文件
    rollupOptions: {
      external: externalize,
    },
  },
};

/** UMD 产物：给 <script> 直引用户，自包含 lit / iconify，开箱即用 */
const umdConfig: UserConfig = {
  build: {
    lib: {
      entry,
      name: "DockvUI",
      formats: ["umd"],
      fileName: () => "dockv-ui.umd.js",
    },
    minify: "esbuild", // 使用 ESbuild 进行压缩
    sourcemap: false, // 发布时不生成 *.map.js 文件
    emptyOutDir: false, // ES 构建已清空过 dist，这里只追加产物，避免互相清空
  },
};

export default defineConfig(({ mode }) => {
  // 默认构建（production / es）产出 ES，--mode umd 时产出 UMD
  return mode === "umd" ? umdConfig : esConfig;
});
