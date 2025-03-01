# MCP (Model Context Protocol) サーバーコンテナ

このディレクトリには、各種 MCP サーバーの Dockerfile 構成が含まれています。

## サポートしている MCP サーバー

-   **Figma MCP**: Figma のコンテキスト情報を取得するサーバー
-   **GitHub MCP**: GitHub のコンテキスト情報を取得するサーバー

## 使用方法

```bash
# 環境変数の設定
cp .env.sample .env
# .envファイルを編集して、必要なトークンを設定
```

## 環境変数

-   `GITHUB_TOKEN`: GitHub API へのアクセスに必要なトークン
-   `FIGMA_API_KEY`: Figma API へのアクセスに必要なトークン

## MCP サーバーの設定

### mcp.json を利用する場合

[.cursor/mcp.json](.cursor/mcp.json)に記載。

### mcp.json を利用しない場合

-   Figma MCP
-   type: command
-   command: npx
-   args: `-y @modelcontextprotocol/server-figma --stdio --figma-api-key=${FIGMA_API_KEY}`
-   GitHub MCP
-   type: command
-   command: npx
-   args: `-y @modelcontextprotocol/server-github --github-personal-access-token=${GITHUB_TOKEN}`

## 参考リンク

-   [Figma MCP](https://github.com/GLips/Figma-Context-MCP)
-   [GitHub MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
