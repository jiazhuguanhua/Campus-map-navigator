# GitHub Pages 部署指南

## 📋 部署前准备

### 1. 确认文件结构
确保你的项目包含以下文件：
```
项目文件夹/
├── index.html          # 主页面（必须命名为 index.html）
├── styles.css          # 样式文件
├── script.js           # JavaScript 文件
├── background.png      # 背景图片
├── README.md           # 项目说明
└── DEPLOYMENT.md       # 本部署指南
```

## 🚀 部署步骤

### 步骤 1: 创建 GitHub 账户
1. 访问 [GitHub.com](https://github.com)
2. 点击 "Sign up" 注册账户
3. 验证邮箱并完成注册

### 步骤 2: 创建新仓库
1. 登录 GitHub
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库设置：
   - **Repository name**: `campus-navigation` (或你喜欢的名字)
   - **Description**: `校园生活服务导航页面`
   - **Public**: 选择 Public（免费用户只能用 Public 仓库部署 Pages）
   - **Add a README file**: ❌ 不要勾选（我们已经有了）
   - **Add .gitignore**: 选择 "None"
   - **Choose a license**: 可选择 "MIT License"
4. 点击 "Create repository"

### 步骤 3: 上传文件到 GitHub

#### 方法 A: 使用 GitHub 网页界面（推荐新手）
1. 在新创建的仓库页面，点击 "uploading an existing file"
2. 将你的所有文件（index.html, styles.css, script.js, background.png, README.md）拖拽到上传区域
3. 在底部的 "Commit changes" 部分：
   - **Commit message**: 输入 "Initial commit - 添加校园导航页面"
   - **Description**: 可选，比如 "包含6个服务地点的导航页面"
4. 点击 "Commit changes"

#### 方法 B: 使用 Git 命令行
如果你熟悉命令行，可以使用以下步骤：

1. 打开命令提示符或 PowerShell
2. 导航到你的项目文件夹：
   ```powershell
   cd "d:\OneDrive\文档\study\University\大二上\新生报到校园地图项目\二维码跳转"
   ```

3. 初始化 Git 仓库：
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - 添加校园导航页面"
   ```

4. 连接到 GitHub 仓库（替换为你的用户名和仓库名）：
   ```powershell
   git remote add origin https://github.com/你的用户名/campus-navigation.git
   git branch -M main
   git push -u origin main
   ```

### 步骤 4: 启用 GitHub Pages
1. 在你的 GitHub 仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分：
   - 选择 "Deploy from a branch"
   - **Branch**: 选择 "main"
   - **Folder**: 选择 "/ (root)"
4. 点击 "Save"

### 步骤 5: 获取网站地址
1. 保存后，页面会显示一个绿色的提示框
2. 你的网站地址将是：`https://你的用户名.github.io/仓库名`
3. 例如：`https://zhangsan.github.io/campus-navigation`

## ⏱️ 部署时间
- 首次部署通常需要 5-10 分钟
- 后续更新通常在 1-3 分钟内生效

## 🔄 更新网站内容

### 使用 GitHub 网页界面更新：
1. 进入你的仓库
2. 点击要修改的文件
3. 点击铅笔图标（Edit this file）
4. 进行修改
5. 滚动到底部，填写 "Commit changes"
6. 点击 "Commit changes"

### 更新背景图片：
1. 在仓库页面点击 "Add file" → "Upload files"
2. 上传新的 background.png（会自动替换旧文件）
3. 提交更改

## 🛠️ 故障排除

### 问题 1: 网站显示 404 错误
**原因**: 主文件没有命名为 `index.html`
**解决**: 确保主页面文件名为 `index.html`

### 问题 2: 背景图片不显示
**原因**: 图片路径错误或文件未上传
**解决**: 
- 确保 `background.png` 已上传到仓库根目录
- 检查文件名大小写是否正确

### 问题 3: CSS 或 JS 不生效
**原因**: 文件路径错误
**解决**: 确保所有文件都在同一目录下，使用相对路径

### 问题 4: 更新后网站没有变化
**原因**: 浏览器缓存或 GitHub Pages 还在处理
**解决**: 
- 等待几分钟再刷新
- 使用 Ctrl+F5 强制刷新浏览器
- 在浏览器中打开无痕模式测试

## 📱 自定义域名（可选）
如果你有自己的域名，可以：
1. 在 Pages 设置中的 "Custom domain" 填入你的域名
2. 在你的域名提供商处设置 DNS 记录

## 🔒 安全提示
- 不要在代码中包含敏感信息（密码、API 密钥等）
- Public 仓库的所有内容都是公开可见的

## 📞 获取帮助
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub 社区论坛](https://github.community/)

## 🎉 恭喜！
完成以上步骤后，你的校园导航页面就成功部署到互联网上了！你可以把网址分享给其他同学使用。
