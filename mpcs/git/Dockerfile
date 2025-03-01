FROM node:20-alpine

WORKDIR /app

# リポジトリをクローン
RUN apk add --no-cache git && \
    git clone https://github.com/modelcontextprotocol/servers.git && \
    cp -r servers/src/git/* . && \
    rm -rf servers && \
    apk del git

# 依存関係をインストール
RUN npm install

# ポートを開放
EXPOSE 3005

# アプリケーションを実行
CMD ["node", "index.js"] 