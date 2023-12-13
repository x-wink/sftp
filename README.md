# 😉 SFTP命令行工具

> 这是一个命令行工具，通过sftp传输本地文件到远程服务器

<!-- 通用 -->

![名称](https://img.shields.io/github/package-json/name/x-wink/wink-sftp?style=for-the-badge)
![版本](https://img.shields.io/github/package-json/v/x-wink/wink-sftp?style=for-the-badge&filename=package.json)

![关键字](https://img.shields.io/github/package-json/keywords/x-wink/wink-sftp?style=for-the-badge)
![许可](https://img.shields.io/github/package-json/license/x-wink/wink-sftp?style=for-the-badge)

<!-- NPM包专用 -->

![下载量](https://img.shields.io/npm/dt/%40xwink/sftp?style=for-the-badge&logo=npm)
![大小](https://img.shields.io/bundlephobia/minzip/%40xwink/sftp?style=for-the-badge&logo=npm)

<!-- GITHUB信息 -->

![收藏](https://img.shields.io/github/stars/x-wink/wink-sftp?style=flat-square&logo=github)
![借鉴](https://img.shields.io/github/forks/x-wink/wink-sftp?style=flat-square&logo=github)
![问题](https://img.shields.io/github/issues/x-wink/wink-sftp?style=flat-square&logo=github)
![请求](https://img.shields.io/github/issues-pr/x-wink/wink-sftp?style=flat-square&logo=github)

## 💎 使用方式

```cmd
npm install --save-dev @xwink/sftp
pnpm add --save-dev @xwink/sftp
```

## 📖 快速入门

> 查看使用帮助

```cmd
npx wink-sftp --help
```

> 最少需要传入这六个参数

```cmd
npx wink-sftp -l ./dist -r /apps/myapp -h xxx.xxx.xxx.xxx -p 22 -u root -pwd 123456
```

## 📦 进阶使用

> 使用配置文件

```cmd
npx wink-sftp -c ./sftp.json
```

> 配置文件

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

## 📄 待办列表

> 暂无

## 🆘问题求助

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

## 👨‍🎨 作者

> XWINK

-   Email: 1041367524@qq.com
-   Github: [@x-wink](https://github.com/x-wink)
-   Homepage: https://xwink.fun

## 🤝 贡献

> 欢迎大家随时[点击这里](https://github.com/x-wink/wink-sftp/issues)为我提供贡献、问题和功能建议

## 😘 感谢支持

> 如果觉得项目对你有帮助，就帮我点个小星星吧~ ⭐️
