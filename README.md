以下是为您整理的 **Cassel** 项目介绍，采用 Markdown 格式编写，您可以直接复制到项目的 `README.md` 中或用于其他展示场景：

---

# Cassel 项目介绍

**Cassel** 是一个基于 **Google AI Studio** 官方模板构建的现代化 AI Web 应用。该项目旨在通过简洁的代码结构，帮助开发者快速将 Google Gemini 大模型的能力集成到自定义的前端界面中。

## 🚀 项目亮点

* **极速开发**：基于 **Vite** 构建，提供秒级的热更新体验。
* **类型安全**：项目核心采用 **TypeScript** 编写（占比 >94%），确保代码逻辑的健壮性。
* **原生集成**：完美契合 Google Gemini API，支持流式传输和多模态交互。
* **轻量架构**：去除了冗余的后端依赖，通过前端环境变量直接与 AI 服务通信。

## 🛠️ 技术栈

| 维度 | 技术方案 |
| :--- | :--- |
| **构建工具** | [Vite](https://vitejs.dev/) |
| **编程语言** | [TypeScript](https://www.typescriptlang.org/) |
| **AI 模型** | [Google Gemini](https://ai.google.dev/) |
| **包管理** | npm |
| **样式** | 原生 CSS (支持响应式布局) |

## 📖 主要功能

1.  **AI 交互界面**：提供了一个开箱即用的对话或任务处理界面。
2.  **API 封装**：内置了与 Google AI Studio 服务的通信协议，处理复杂的身份验证和请求逻辑。
3.  **环境配置**：支持通过 `.env` 文件安全管理 API 密钥，避免敏感信息泄露。
4.  **易于扩展**：开发者可以轻松修改 `src` 目录下的逻辑，定制专属的 Prompt 模板或 UI 风格。

## 🔧 快速开始

### 前置条件
* 已安装 **Node.js** (建议 v18+)
* 拥有一个 **Gemini API Key** (可在 [Google AI Studio](https://aistudio.google.com/) 免费获取)

### 本地运行
1. **克隆项目**
   ```bash
   git clone https://github.com/terrenceftz/cassel.git
   cd cassel
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   在根目录下新建 `.env.local` 文件，并填入你的 API Key：
   ```env
   VITE_GEMINI_API_KEY=你的_GEMINI_API_KEY_
   ```

4. **启动项目**
   ```bash
   npm run dev
   ```

## 🌐 部署

项目支持一键部署至 **Vercel**、**Netlify** 或 **GitHub Pages**。由于是静态站点架构，您可以轻松地将其托管在任何支持前端部署的平台。

---

**项目地址**: [terrenceftz/cassel](https://github.com/terrenceftz/cassel)
