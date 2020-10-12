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




