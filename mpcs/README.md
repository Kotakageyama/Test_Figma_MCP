# MCP (Model Context Protocol) サーバーコンテナ

このディレクトリには、各種 MCP サーバーの Dockerfile 構成が含まれています。

## サポートしている MCP サーバー

-   **Figma MCP**: Figma のコンテキスト情報を取得するサーバー（ポート 3000）
-   **Git MCP**: Git リポジトリのコンテキスト情報を取得するサーバー（ポート 3005）
-   **GitHub MCP**: GitHub のコンテキスト情報を取得するサーバー（ポート 3002）
-   **Notion MCP**: Notion のコンテキスト情報を取得するサーバー（ポート 3001）
-   **Memory MCP**: メモリコンテキスト情報を管理するサーバー（ポート 3003）

## 使用方法

プロジェクトのルートディレクトリで以下のコマンドを実行します：

```bash
# 環境変数の設定
cp .env.sample .env
# .envファイルを編集して、必要なトークンを設定

# Docker コンテナの構築と起動
docker-compose up -d

# 特定のサービスのみ構築・起動する場合
docker-compose up -d figma-mcp github-mcp

# ログの確認
docker-compose logs -f

# コンテナの停止
docker-compose down
```

## 環境変数

-   `GITHUB_TOKEN`: GitHub API へのアクセスに必要なトークン
-   `NOTION_TOKEN`: Notion API へのアクセスに必要なトークン

## 参考リンク

-   [Figma MCP](https://github.com/GLips/Figma-Context-MCP)
-   [Git MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/git)
-   [GitHub MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
-   [Notion MCP](https://github.com/v-3/notion-server)
-   [Memory MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)
