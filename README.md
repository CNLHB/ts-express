## 源码目录
[接口文档地址](https://easydoc.xyz/s/10480727/fOgR0odQ/0Zv7nmQZ)
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
> 请求地址： 192.168.160.72:520/api
> 登录状态下自动携带cookie：sign-cooike
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
> msg: "success" or "other"  
> data: [] or {} or "" 

+ 非分页情况
```json
{
	"code": 0,
	"msg": "sucess",
	"data": {
		"id": 1,
		"userName": "aiwa",
		"nickname": "aiwa",
		"nameUpdateDate": "2020-11-19T09:58:04.000Z",
		"phone": "15363398328",
		"image": "http://192.168.160.72:520/static/images/aiwa-avatar.png",
		"email": "1348844909@qq.com",
		"account": "940392A",
		"bindWx": false,
		"created_at": "2020-11-19T15:09:11.000Z",
		"updated_at": "2020-11-19T15:09:11.000Z"
	}
}

```

+ 分页情况
    - page 当前页
    - pageSize 当前页最大值
    - total 查询总量
    - list 查询集合
```json
{
	"code": 0,
	"msg": "sucess",
	"data": {
		"page": 1,
		"pageSize": 10,
		"total": 1,
		"list": []
	}
}
``` 

