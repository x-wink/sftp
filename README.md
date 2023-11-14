<h1 align="center">欢迎使用我的SFTP命令行工具 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.2-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/x-wink/wink-sftp#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

## ⬇️ 使用方式

```cmd
# 安装依赖
npm install --save-dev @xwink/sftp
pnpm add --save-dev @xwink/sftp

# 查看使用帮助
npx wink-sftp --help

# 最少需要传入这六个参数
npx wink-sftp -l ./dist -r /apps/myapp -h xxx.xxx.xxx.xxx -p 22 -u root -pwd 123456

# 或者使用配置文件
npx wink-sftp -c ./sftp.json
```

## 🎟️ 配置文件

```json
{
    "local": "",
    "remote": "",
    "debug": false,
    "connect": {
        "host": "",
        "port": 22,
        "username": "",
        "password": ""
    },
    "sftpOptions": {
        "excludes": [],
        "flat": false,
        "clear": false,
        "override": false,
        "debug": false,
        "ignoreHidden": true
    }
}
```

## 😅 目前问题

> 如果使用`pnpm`安装依赖，使用`@vercel/ncc`可以正常打包，  
> 但是如果改为`rollup`打包的话就会报错，必须使用`npm`安装依赖才行  
> 经过排查是依赖`ssh2`引起的，错误信息为

```
E:\WorkSpace\wink-sftp\dist\src\index.js → dist/index.js...
[!] RollupError: Could not resolve "../build/Release/cpufeatures.node" from "../build/Release/cpufeatures.node?commonjs-external"
../build/Release/cpufeatures.node?commonjs-external
    at error (E:\WorkSpace\wink-sftp\node_modules\.pnpm\rollup@3.23.0\node_modules\rollup\dist\shared\rollup.js:278:30)
    at ModuleLoader.handleInvalidResolvedId (E:\WorkSpace\wink-sftp\node_modules\.pnpm\rollup@3.23.0\node_modules\rollup\dist\shared\rollup.js:24485:24)
    at E:\WorkSpace\wink-sftp\node_modules\.pnpm\rollup@3.23.0\node_modules\rollup\dist\shared\rollup.js:24447:26
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

## 🎯 框架依赖

-   [ssh2](github.com/mscdex/ssh2) 创建 SSH 连接
-   [commander](github.com/tj/commander.js) `nodejs`命令行解决方案

---

-   [Vite](https://cn.vitejs.dev/) 脚手架
-   [Typescript](https://www.tslang.cn) JavaScript 的超集
-   [Eslint](https://eslint.bootcss.com/) 可组装的 JavaScript 和 JSX 检查工具
-   [Prettier](https://prettier.io/) 代码格式化程序
-   [LintStaged](https://github.com/okonet/lint-staged#readme) 针对暂存的 git 文件运行检查
-   [Husky](https://typicode.github.io/husky) 改善你的提交
-   [CommitLint](https://github.com/conventional-changelog/commitlint#readme) 检查代码提交消息

## 👤 作者

**向文可**

-   Email: 1041367524@qq.com
-   Github: [@x-wink](https://github.com/x-wink)

## 🤝 贡献

欢迎提交代码、提出问题和功能建议<br /> [反馈地址](https://github.com/x-wink/libary-template/issues)

如果这个项目对你有帮助的话就点个小星星吧 ⭐️
