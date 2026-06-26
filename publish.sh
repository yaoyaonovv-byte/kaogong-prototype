#!/bin/bash
set -e
cd "$(dirname "$0")"

# 1. GitHub 登录（打开浏览器授权）
echo "=== 第一步：GitHub 登录 ==="
gh auth login --web --git-protocol https || true

# 2. 创建仓库并推送
echo ""
echo "=== 第二步：创建仓库并推送 ==="
REPO_NAME="kaogong-prototype"

gh repo create "$REPO_NAME" --public --source=. --remote=origin --push 2>&1 || {
  # 如果仓库已存在，尝试直接推送
  echo "仓库可能已存在，尝试直接推送..."
  git remote add origin "https://github.com/$(gh api user --jq .login)/$REPO_NAME.git" 2>/dev/null || true
  git push -u origin main
}

echo ""
echo "=== 发布完成！==="
echo "GitHub Pages 会在 GitHub Actions 运行后自动部署。"
echo "部署状态： https://github.com/$(gh api user --jq .login 2>/dev/null || echo "你的用户名")/$REPO_NAME/actions"
echo "Pages 地址： https://$(gh api user --jq .login 2>/dev/null || echo "你的用户名").github.io/$REPO_NAME"
