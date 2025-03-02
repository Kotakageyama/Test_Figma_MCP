FROM node:22.14-alpine

WORKDIR /app

# 必要なパッケージをインストール
RUN apk add --no-cache git

# パッケージをインストール
RUN npm install -g figma-developer-mcp

# デフォルトのポートを指定
EXPOSE 3000

# サーバーを起動
CMD ["npx", "figma-developer-mcp", "--port=${PORT}"]
