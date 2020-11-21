## 源码目录

```
- build                         | 打包文件
- src	                        | 源码目录
    - app                       | 业务代码
    - config                    | 配置文件
    - utils                     | 工具文件夹
- index	                        | 入口文件
--
```

## 接口说明

> 无特殊说明所有接口数据都是以json格式发送   ['Content-Type'] = 'application/json;charset=UTF-8';
>
> 登录状态下携带cookie：sign-cooike
>
> 统一前缀    /api 
>
> 状态码：
>
> - 2xx：成功
> - 4xx：参数有误
> - 5xx：服务器内部异常
>
> 返回值:
>
> code: 0  表示成功 ，其他表示有误	
>

