# 太一科技官方网站

基于Tailwind CSS构建的企业网站，展示太一科技的产品、服务和企业文化。

## 技术栈

- HTML5
- CSS3
- JavaScript
- Tailwind CSS
- Font Awesome图标
- Chart.js数据可视化

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（监视CSS变化）
npm run watch

# 构建生产版本
npm run build
```

## 部署

项目已配置Netlify自动部署：

1. 构建命令: `bash netlify.sh`
2. 发布目录: `dist`

## 目录结构

- `/*.html` - 网站页面
- `/src/input.css` - Tailwind CSS源文件
- `/styles.css` - 编译后的CSS
- `/netlify.toml` - Netlify配置
- `/netlify.sh` - 部署脚本

## 功能特点

- 响应式设计，适配各种设备
- 产品展示与在线购买
- 企业博客
- 联系表单
- 数据可视化
- 用户友好的界面