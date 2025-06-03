#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 打印当前目录和环境信息
echo "Current directory: $(pwd)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 安装依赖
npm install

# 构建项目
npm run build

# 确保所有HTML文件都在dist目录中
echo "Ensuring all HTML files are in dist directory..."
cp -r *.html dist/ 2>/dev/null || true

# 列出dist目录内容进行检查
echo "Dist directory contents:"
ls -la dist/

echo "Build completed successfully!"