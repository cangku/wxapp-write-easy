# Wxapp-Write-Easy

> 想法简单点，写微信小程序的方式简单点。  
以多包管理形式更新维护小程序插件功能，插件中包含页面、组件、函数。

## 使用方式
- requirePlugin
- npm (小程序暂时不支持直接使用 `node_modules`，安装以后需要将插件资源目录修改为 `npm` 放置在项目内引用，后续支持以后可以忽略更名操作)

## 目录解构
```
packages  
    plugins  
        doctorwork 插件名  
            components
            pages
            utils
            plugin.json
    wechat  
    weapp 小程序示例  
        npm 对应的是 plugins 下的 doctorwork  
        pages 小程序页面  
        app.js 入口文件  
        app.json 配置文件
```  

## 功能简介
- [X] API 优化，异步 API Promise 化
- [ ] wxss 预编译

## 扩展学习
`lerna` 的使用

- lerna init
- lerna bootstrap
- lerna publish