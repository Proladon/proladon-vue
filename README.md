# Vue 專案結構說明

## 專案結構

```
src/                    # 主要源代碼目錄
├── api/                # API 請求相關文件
├── assets/             # 靜態資源
├── components/         # 元件目錄
├── composables/        # Vue 3 組合式 API 目錄
├── config/             # 配置文件目錄
├── layouts/            # 頁面布局元件
├── locales/            # 國際化語言包
├── plugins/            # 插件配置
├── libs/                 # 三方庫配置
│   └── axios.ts        # Axios HTTP 客戶端配置
├── router/             # 路由相關
│   ├── guard.ts        # 路由守衛
│   ├── index.ts        # 路由主文件
│   ├── types.ts        # 路由類型定義
│   └── modules/        # 路由模塊
│       └── base.ts     # 基礎路由
├── stores/             # 狀態管理
│   └── index.ts        # 狀態管理主文件
├── styles/             # 樣式文件
├── themes/             # 主題文件
├── utils/              # 工具函數
│   ├── helper.ts       # 通用輔助函數
├── views/              # 頁面視圖
├── App.vue             # 應用根元件
├── env.d.ts            # 環境變數類型定義
├── envVar.ts           # 環境變數
└── main.ts             # 應用入口點
```

## 技術架構

本專案使用以下技術：

- **Vue 3**：採用 Composition API 的漸進式 JavaScript 框架
- **TypeScript**：JavaScript 的超集，提供靜態類型檢查
- **Vite**：現代化的前端構建工具，提供更快的開發體驗
- **Vue Router**：Vue.js 官方路由管理器
- **Pinia**：Vue 的狀態管理庫
- **Axios**：基於 Promise 的 HTTP 客戶端
- **Vitest**：Vite 原生的單元測試框架