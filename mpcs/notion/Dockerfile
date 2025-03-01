FROM node:20-alpine

WORKDIR /app

# リポジトリをクローン
RUN apk add --no-cache git && \
    git clone https://github.com/v-3/notion-server.git . && \
    apk del git

# 依存関係をインストール
RUN npm install

# ポートを開放
EXPOSE 3001

# アプリケーションを実行
CMD ["node", "index.js"] 