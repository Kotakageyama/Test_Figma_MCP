# MCP (Model Context Protocol) サーバー

このディレクトリには、各種MCPサーバーの設定が含まれています。

## サポートしている MCP サーバー

-   **Figma MCP**: Figmaのコンテキスト情報を取得するサーバー
-   **GitHub MCP**: GitHubのコンテキスト情報を取得するサーバー

## 使用方法

> mcp.jsonがローカル環境変数読み込みに対応していない かつ claudeのmcp構文のenv指定に対応していないためmcp.jsonのコマンドを少し変更している。

```bash
# 環境変数の設定
cp mcp.json.sample mcp.json
# jsonファイルを編集して、必要なトークンを設定
```


## 環境変数

-   `GITHUB_TOKEN`: GitHub APIへのアクセスに必要なトークン
-   `FIGMA_API_KEY`: Figma APIへのアクセスに必要なトークン

## MCP サーバーの設定

### mcp.json を利用する場合

[.cursor/mcp.json.sample](.cursor/mcp.json.sample)に記載。

### mcp.json を利用しない場合
```bash
$ docker compose up -d 
```

-   Figma MCP
-   type: sse
-   args: `http://localhost:3000/sse`
-   GitHub MCP
-   type: command
-   args: `env GITHUB_PERSONAL_ACCESS_TOKEN=your_token npx -y @modelcontextprotocol/server-github`

## 参考リンク

-   [Figma MCP](https://github.com/GLips/Figma-Context-MCP)
-   [GitHub MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
