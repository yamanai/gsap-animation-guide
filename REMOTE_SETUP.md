# 远程仓库设置指南

完成以下步骤，将您的本地Git仓库连接到远程托管平台（如GitHub、GitLab或Gitee）。

## 在远程平台创建仓库

1. 登录您的GitHub/GitLab/Gitee账号
2. 创建一个新的仓库，命名为`gsap-animation-guide`或其他您喜欢的名称
3. 不要初始化仓库，保持为空仓库

## 连接并推送到远程仓库

### GitHub

```powershell
# 添加远程仓库
git remote add origin https://github.com/您的用户名/gsap-animation-guide.git

# 推送到远程仓库
git push -u origin master
```

### GitLab

```powershell
# 添加远程仓库
git remote add origin https://gitlab.com/您的用户名/gsap-animation-guide.git

# 推送到远程仓库
git push -u origin master
```

### Gitee (码云)

```powershell
# 添加远程仓库
git remote add origin https://gitee.com/您的用户名/gsap-animation-guide.git

# 推送到远程仓库
git push -u origin master
```

## 查看远程仓库配置

```powershell
# 查看已配置的远程仓库
git remote -v
```

## 常见问题

### 如何处理认证问题?

如果推送时遇到认证问题，可以尝试以下解决方案：

1. 使用个人访问令牌(Personal Access Token)代替密码
2. 设置SSH密钥进行认证
3. 使用凭证管理器存储认证信息

### 如何更改远程仓库URL?

```powershell
# 更改远程仓库URL
git remote set-url origin 新的URL
```

### 如何处理冲突?

如果远程仓库有您本地没有的更改，推送时可能会被拒绝。此时需要先拉取远程更改：

```powershell
# 拉取远程更改并合并
git pull origin master

# 解决冲突后再次推送
git push origin master
``` 