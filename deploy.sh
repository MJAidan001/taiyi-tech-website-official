#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 打印当前目录
echo "Current directory: $(pwd)"

# 提交到主分支
git add .
git commit -m "deploy: 更新网站内容"
git push origin main

echo "Deployment complete!"
