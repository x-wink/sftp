<h1 align="center">欢迎使用我的SFTP命令行工具 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/x-wink/wink-sftp#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

## ⬇️ 使用方式

```cmd
# 安装依赖
npm install --global @xwink/sftp
npm install --save-dev @xwink/sftp
npx wink-sftp [options]

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
        "debug": false
    }
}
```

## 🎯 框架依赖

-   [ssh2](github.com/mscdex/ssh2) 创建 SSH 连接
-   [commander](github.com/tj/commander.js) `nodejs`命令行解决方案

## 👤 Author

**向文可**

-   Email: 13202090601@163.com
-   Github: [@x-wink](https://github.com/x-wink)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/x-wink/libary-template/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
