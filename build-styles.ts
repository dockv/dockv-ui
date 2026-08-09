/**
 * 样式打包脚本
 * 将 SCSS 编译为最终的 CSS 文件
 *
 * 产物结构：
 * dist/
 * └── dockv-ui.css       # 全量样式汇总（编译 src/styles/index.scss）
 */

import { compile } from "sass-embedded";
import { resolve, dirname } from "path";
import { mkdirSync, writeFileSync } from "fs";

const rootDir = resolve(import.meta.dirname, "."); // 根目录
const srcIndex = resolve(rootDir, "src/styles/index.scss"); // SCSS 入口
const srcDir = resolve(rootDir, "src/styles"); // SCSS 源目录（用于解析 @use）
const distDir = resolve(rootDir, "dist"); // CSS 输出目录
const outPath = resolve(distDir, "dockv-ui.css"); // 全量样式输出文件

/** 安全的错误信息提取 */
function getMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** 终端颜色工具 */
const colors = {
  green: "\x1b[42m", // 绿色背景
  red: "\x1b[41m", // 红色背景
  white: "\x1b[37m", // 白色文字
  reset: "\x1b[0m", // 重置
};
function badge(text: string, bg: "green" | "red"): string {
  return `${colors[bg]}${colors.white} ${text} ${colors.reset}`;
}

/** 确保输出目录存在 */
function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

console.log("\n🧩 正在编译样式...");

try {
  const result = compile(srcIndex, {
    style: "compressed",
    loadPaths: [srcDir],
  });
  ensureDir(outPath);
  writeFileSync(outPath, result.css);
  console.log(`  ${badge("OK", "green")} dockv-ui.css`);
  console.log(`\n✅ 完成！产物目录: ${distDir}\n`);
} catch (err: unknown) {
  console.error(`  ${badge("FAIL", "red")} dockv-ui.css: ${getMessage(err)}`);
  process.exit(1);
}
