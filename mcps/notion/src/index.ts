#!/usr/bin/env node

import { Client } from '@notionhq/client';
import { MCPServer, MCPFunction, MCPFunctionParameter } from '@modelcontextprotocol/sdk';

// Notionクライアントの初期化
let notionClient: Client | null = null;

// 環境変数からNotionトークンを取得
const NOTION_API_KEY = process.env.NOTION_API_KEY;

// MCPサーバーの設定
const server = new MCPServer({
  title: 'Notion MCP Server',
  description: 'Notion APIと連携するためのMCPサーバー',
  version: '0.1.0',
});

// Notionクライアントの初期化関数
function initNotionClient(): Client {
  if (!NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY環境変数が設定されていません');
  }

  if (!notionClient) {
    notionClient = new Client({
      auth: NOTION_API_KEY,
    });
  }

  return notionClient;
}

// データベース一覧を取得する関数
const listDatabases = new MCPFunction({
  name: 'list_databases',
  description: 'Notionのデータベース一覧を取得します',
  parameters: [],
  handler: async () => {
    try {
      const client = initNotionClient();
      const response = await client.search({
        filter: {
          value: 'database',
          property: 'object',
        },
      });

      return response.results;
    } catch (error) {
      console.error('データベース一覧の取得に失敗しました:', error);
      throw error;
    }
  },
});

// データベースの内容を取得する関数
const queryDatabase = new MCPFunction({
  name: 'query_database',
  description: 'Notionのデータベースの内容を取得します',
  parameters: [
    new MCPFunctionParameter({
      name: 'database_id',
      description: 'データベースのID',
      type: 'string',
      required: true,
    }),
    new MCPFunctionParameter({
      name: 'filter',
      description: 'フィルター条件（オプション）',
      type: 'object',
      required: false,
    }),
    new MCPFunctionParameter({
      name: 'sorts',
      description: 'ソート条件（オプション）',
      type: 'array',
      required: false,
    }),
  ],
  handler: async ({ database_id, filter, sorts }) => {
    try {
      const client = initNotionClient();
      const response = await client.databases.query({
        database_id: database_id as string,
        filter: filter as any,
        sorts: sorts as any,
      });

      return response.results;
    } catch (error) {
      console.error('データベースの取得に失敗しました:', error);
      throw error;
    }
  },
});

// ページの内容を取得する関数
const getPage = new MCPFunction({
  name: 'get_page',
  description: 'Notionのページ情報を取得します',
  parameters: [
    new MCPFunctionParameter({
      name: 'page_id',
      description: 'ページのID',
      type: 'string',
      required: true,
    }),
  ],
  handler: async ({ page_id }) => {
    try {
      const client = initNotionClient();
      const response = await client.pages.retrieve({
        page_id: page_id as string,
      });

      return response;
    } catch (error) {
      console.error('ページの取得に失敗しました:', error);
      throw error;
    }
  },
});

// ページのブロック内容を取得する関数
const getPageBlocks = new MCPFunction({
  name: 'get_page_blocks',
  description: 'Notionのページのブロック内容を取得します',
  parameters: [
    new MCPFunctionParameter({
      name: 'block_id',
      description: 'ブロックID（通常はページID）',
      type: 'string',
      required: true,
    }),
  ],
  handler: async ({ block_id }) => {
    try {
      const client = initNotionClient();
      const response = await client.blocks.children.list({
        block_id: block_id as string,
      });

      return response.results;
    } catch (error) {
      console.error('ブロック内容の取得に失敗しました:', error);
      throw error;
    }
  },
});

// ページを作成する関数
const createPage = new MCPFunction({
  name: 'create_page',
  description: 'Notionに新しいページを作成します',
  parameters: [
    new MCPFunctionParameter({
      name: 'parent',
      description: 'ページの親（データベースIDまたはページID）',
      type: 'object',
      required: true,
    }),
    new MCPFunctionParameter({
      name: 'properties',
      description: 'ページのプロパティ',
      type: 'object',
      required: true,
    }),
    new MCPFunctionParameter({
      name: 'children',
      description: 'ページの子ブロック（オプション）',
      type: 'array',
      required: false,
    }),
  ],
  handler: async ({ parent, properties, children }) => {
    try {
      const client = initNotionClient();
      const response = await client.pages.create({
        parent: parent as any,
        properties: properties as any,
        children: children as any,
      });

      return response;
    } catch (error) {
      console.error('ページの作成に失敗しました:', error);
      throw error;
    }
  },
});

// ページを更新する関数
const updatePage = new MCPFunction({
  name: 'update_page',
  description: 'Notionのページを更新します',
  parameters: [
    new MCPFunctionParameter({
      name: 'page_id',
      description: 'ページのID',
      type: 'string',
      required: true,
    }),
    new MCPFunctionParameter({
      name: 'properties',
      description: '更新するプロパティ',
      type: 'object',
      required: true,
    }),
  ],
  handler: async ({ page_id, properties }) => {
    try {
      const client = initNotionClient();
      const response = await client.pages.update({
        page_id: page_id as string,
        properties: properties as any,
      });

      return response;
    } catch (error) {
      console.error('ページの更新に失敗しました:', error);
      throw error;
    }
  },
});

// ブロックを追加する関数
const appendBlockChildren = new MCPFunction({
  name: 'append_block_children',
  description: 'Notionのブロックに子ブロックを追加します',
  parameters: [
    new MCPFunctionParameter({
      name: 'block_id',
      description: 'ブロックID（通常はページID）',
      type: 'string',
      required: true,
    }),
    new MCPFunctionParameter({
      name: 'children',
      description: '追加する子ブロック',
      type: 'array',
      required: true,
    }),
  ],
  handler: async ({ block_id, children }) => {
    try {
      const client = initNotionClient();
      const response = await client.blocks.children.append({
        block_id: block_id as string,
        children: children as any,
      });

      return response;
    } catch (error) {
      console.error('ブロックの追加に失敗しました:', error);
      throw error;
    }
  },
});

// ブロックを更新する関数
const updateBlock = new MCPFunction({
  name: 'update_block',
  description: 'Notionのブロックを更新します',
  parameters: [
    new MCPFunctionParameter({
      name: 'block_id',
      description: 'ブロックID',
      type: 'string',
      required: true,
    }),
    new MCPFunctionParameter({
      name: 'content',
      description: '更新するブロックの内容',
      type: 'object',
      required: true,
    }),
  ],
  handler: async ({ block_id, content }) => {
    try {
      const client = initNotionClient();
      const response = await client.blocks.update({
        block_id: block_id as string,
        ...content as any,
      });

      return response;
    } catch (error) {
      console.error('ブロックの更新に失敗しました:', error);
      throw error;
    }
  },
});

// ブロックを削除する関数
const deleteBlock = new MCPFunction({
  name: 'delete_block',
  description: 'Notionのブロックを削除します',
  parameters: [
    new MCPFunctionParameter({
      name: 'block_id',
      description: 'ブロックID',
      type: 'string',
      required: true,
    }),
  ],
  handler: async ({ block_id }) => {
    try {
      const client = initNotionClient();
      const response = await client.blocks.delete({
        block_id: block_id as string,
      });

      return response;
    } catch (error) {
      console.error('ブロックの削除に失敗しました:', error);
      throw error;
    }
  },
});

// 検索関数
const searchNotion = new MCPFunction({
  name: 'search_notion',
  description: 'Notionの内容を検索します',
  parameters: [
    new MCPFunctionParameter({
      name: 'query',
      description: '検索クエリ',
      type: 'string',
      required: true,
    }),
    new MCPFunctionParameter({
      name: 'filter',
      description: 'フィルター条件（オプション）',
      type: 'object',
      required: false,
    }),
    new MCPFunctionParameter({
      name: 'sort',
      description: 'ソート条件（オプション）',
      type: 'object',
      required: false,
    }),
  ],
  handler: async ({ query, filter, sort }) => {
    try {
      const client = initNotionClient();
      const response = await client.search({
        query: query as string,
        filter: filter as any,
        sort: sort as any,
      });

      return response.results;
    } catch (error) {
      console.error('検索に失敗しました:', error);
      throw error;
    }
  },
});

// 関数をサーバーに登録
server.addFunction(listDatabases);
server.addFunction(queryDatabase);
server.addFunction(getPage);
server.addFunction(getPageBlocks);
server.addFunction(createPage);
server.addFunction(updatePage);
server.addFunction(appendBlockChildren);
server.addFunction(updateBlock);
server.addFunction(deleteBlock);
server.addFunction(searchNotion);

// サーバーを起動
server.start(); 