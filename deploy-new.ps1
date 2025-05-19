# 构建
npm run build

# 记录当前目录
$currentDir = Get-Location

# 进入构建输出目录
cd docs/.vitepress/dist

# 初始化Git仓库
git init
git add -A
git commit -m 'deploy documentation'

# 推送到gh-pages分支
git push -f git@github.com:yamanai/gsap-animation-guide.git master:gh-pages

# 返回原目录
cd $currentDir 