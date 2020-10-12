
# 项目案例

## 目录结构

```javascript
.
app.js	项目的入口文件
controllers
models	存储使用mongoose设计的数据模型
node_modules	第三方包
package.json	包描述文件
package-lock.json	第三方包版本锁定文件（npm5之后才有）
public	公共静态资源
routes	如果业务比较多，代码量大，最好把路由按照业务的分类存储到 routes 目录中
router.js 简单一点把所有的路由都放到这个文件
views	存储视图目录
```

## 模板页

- [art-template子模板](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF)
- [art-template模板继承](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF)

## 路由设计

|  路径   | 方法  | get参数 | post参数 | 是否需要权限 | 备注 |
|  ----  |  ---- | ----  |  ---- | ----  |  ---- |
| / | get |  |  |  | 渲染首页 |
| /register | get |  |  |  | 渲染注册页面 |
| /register | post |  | email,username,password |  | 处理注册请求 |
| /login | get |  |  |  | 渲染登陆页面 |
| /login | post |  | email，password |  | 处理登陆请求 |
| /loginout | get |  |  |  | 处理退出请求 |
| /profile | get |  |  |  | 渲染设置页面 |
| /profile | post |  |  |  | 处理设置请求 |
| /topic/new | get |  |  |  | 渲染发表文章页面 |
| /topic/new | post |  |  |  | 处理发布请求 |
| /topic/show | get |  |  |  | 渲染文章详细页和评论 |
| /comment | post |  |  |  | 提交评论 |
| /getfun | get |  |  |  | 关注请求 |

## 模型设计

## 功能实现

## 步骤

- 创建目录结构
- 整合静态也-模板页
  - include
  - block
  - extend
- 设计用户登陆，退出，注册的路由
- 用户注册
  - 先处理客户端页面的内容（表单控件的name，收集表单数据，发起请求）
  - 服务端
    - 获取从客户端收到的数据
    - 操作数据库
      - 如果有错，发送500告诉客户端服务器错了‘
      - 其他的根据业务发送不同的响应数据
- 登录
- 退出


