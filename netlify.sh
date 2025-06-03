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

# 确保所有JS文件都在dist目录中
echo "Ensuring all JS files are in dist directory..."
cp -r *.js dist/ 2>/dev/null || true

# 创建_redirects文件
echo "Creating _redirects file..."
echo "/* /index.html 200" > dist/_redirects
echo "/404.html 404" >> dist/_redirects

echo "Build completed successfully!"