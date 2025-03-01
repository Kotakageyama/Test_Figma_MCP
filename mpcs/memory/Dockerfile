FROM node:20-alpine

WORKDIR /app

# リポジトリをクローン
RUN apk add --no-cache git && \
    git clone https://github.com/modelcontextprotocol/servers.git && \
    cp -r servers/src/memory/* . && \
    rm -rf servers && \
    apk del git

# 依存関係をインストール
RUN npm install

# ポートを開放
EXPOSE 3003

# アプリケーションを実行
CMD ["node", "index.js"] 