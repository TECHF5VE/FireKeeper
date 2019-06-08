# Database Design

## News

| name      | type      | key | null | default | desc              |
| --------- | --------- | --- | ---- | ------- | ----------------- |
| id        | varchar   | PK  |      |         | 自增主键          |
| image     | text      |     |      |         | 图片              |
| content   | text      |     |      |         | 消息内容          |
| position  | varchar   |     |      |         | 地理位置(`,`分隔) |
| keywords  | text      |     |      |         | 关键字            |
| sentiment | text      |     |      |         | 情感              |
| weight    | float     |     |      |         | 权重              |
| createdAt | timestamp |     |      |         | 发布时间          |
| dismissAt | timestamp |     |      |         | 消失时间          |

# Api Design

## 提交 News

### 请求

```
[PUT] /api/news
```

### 参数

```json
{
  "image": "https://xxx",
  "content": "news content",
  "position": "xx,xx"
}
```

### 响应

```json
{
  "success": true,
  "msg": "success",
  "data": {
    "id": 1,
    "image": "https://xxx",
    "content": "news content",
    "position": "xx,xx",
    "keywords": "",
    "sentiment": "",
    "weight": 1
  }
}
```

## 获取 News

### 请求

```
[GET] /api/news/list
```

### 响应

```json
{
  "success": true,
  "msg": "success",
  "data": [
    {
      "id": 1,
      "image": "https://xxx",
      "content": "news content",
      "position": "xx,xx",
      "keywords": "",
      "sentiment": "",
      "weight": 1
    }
  ]
}
```
