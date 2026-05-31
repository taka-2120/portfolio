# obsidian-mcp-server

Vault の `blog/` ディレクトリを読み書きする MCP サーバー。  
Claude が `write_blog_post` ツールで直接 Obsidian に記事を書けるようになる。  
バッチ実行（`POST /sync`）で vault → portfolio の draft PR を自動作成する。

## エンドポイント

| エンドポイント | 用途 |
|---|---|
| `POST /mcp` | MCP プロトコル (Claude 用) |
| `POST /sync?slug=xxx` | vault を読んで portfolio に PR 作成。slug 省略で全件 |

## セットアップ

### 1. 依存インストール・ビルド

```bash
cd /path/to/portfolio/obsidian-mcp-server
npm install
npm run build
```

### 2. 環境変数

`.env.example` をコピーして `.env` を作成し、各値を設定する。

```bash
cp .env.example .env
```

| 変数 | 説明 |
|---|---|
| `VAULT_ROOT` | Obsidian vault のパス (例: `/home/user/Documents/vault`) |
| `AUTH_TOKEN` | Bearer token。強いランダム文字列を設定すること |
| `PORT` | `3001` |
| `GITHUB_TOKEN` | portfolio への fine-grained PAT (contents + pull_requests: write) |
| `PORTFOLIO_REPO` | `taka-2120/portfolio` |

### 3. systemd サービス登録

```bash
# obsidian-mcp.service の User と WorkingDirectory を実際のパスに書き換える
sudo cp obsidian-mcp.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now obsidian-mcp
sudo systemctl status obsidian-mcp
```

### 4. Cloudflare Tunnel で外部公開

```bash
# cloudflared インストール
curl -L -o cloudflared.deb \
  https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb

# 認証とトンネル作成
cloudflared tunnel login
cloudflared tunnel create obsidian-mcp

# ~/.cloudflared/config.yml
cat > ~/.cloudflared/config.yml << 'EOF'
tunnel: <tunnel-id>
credentials-file: /root/.cloudflared/<tunnel-id>.json
ingress:
  - hostname: obsidian-mcp.yourdomain.com
    service: http://localhost:3001
  - service: http_status:404
EOF

sudo cloudflared service install
sudo systemctl enable --now cloudflared
```

router のポート開放は不要。

### 5. Claude Code に MCP 登録

`~/.claude/settings.json` に以下を追加:

```json
{
  "mcpServers": {
    "obsidian-mcp": {
      "type": "url",
      "url": "https://obsidian-mcp.yourdomain.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_AUTH_TOKEN"
      }
    }
  }
}
```

### 6. GitHub Actions シークレット登録

`taka-2120/portfolio` の Settings → Secrets and variables → Actions:

- `OBSIDIAN_MCP_TOKEN`: AUTH_TOKEN と同じ値
- `OBSIDIAN_MCP_URL`: Cloudflare Tunnel の URL (`https://obsidian-mcp.yourdomain.com`)

## Vault のディレクトリ構造

```
{VAULT_ROOT}/
  blog/
    {slug}/
      en.md   ← Claude が write_blog_post で書く
      ja.md
```

slug はケバブケース (例: `debugging-swift-concurrency`)。
