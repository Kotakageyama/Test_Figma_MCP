FROM node:22.14-alpine

WORKDIR /app

# 必要なパッケージをインストール
RUN apk add --no-cache git

# パッケージをインストール
RUN npm install -g @modelcontextprotocol/sdk

# 作業ディレクトリを作成
RUN mkdir -p /app/notion

# package.jsonをコピー
COPY ./package.json /app/notion/
COPY ./tsconfig.json /app/notion/

# ソースコードをコピー
COPY ./src /app/notion/src/

# ビルド
WORKDIR /app/notion
RUN npm install
RUN npm run build

# デフォルトのポートを指定
EXPOSE 3000

# サーバーを起動
CMD ["node", "build/index.js", "--port=${PORT}"] 