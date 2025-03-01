FROM node:20-alpine

WORKDIR /app

# リポジトリをクローン
RUN apk add --no-cache git && \
    git clone https://github.com/GLips/Figma-Context-MCP.git . && \
    apk del git

# 依存関係をインストール
RUN npm install

# アプリケーションをビルド
RUN npm run build

# ポートを開放
EXPOSE 3000

# アプリケーションを実行
CMD ["npm", "start"] 