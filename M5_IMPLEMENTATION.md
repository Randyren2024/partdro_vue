# M5 Stripe 集成实施文档

## ✅ 已完成的功能

### 1. Stripe SDK 安装
- `stripe` - 服务端 Stripe SDK
- `@stripe/stripe-js` - 客户端 Stripe.js

### 2. Netlify Functions

#### `netlify/lib/stripe.ts`
- Stripe 客户端初始化
- 运费计算逻辑（满 $500 免运费，否则 $25）
- 税费计算逻辑（当前为 0，可集成 Stripe Tax）
- 订单号生成函数（格式：PD-YYYYMMDD-XXXX）

#### `netlify/functions/create-payment-intent.ts`
- 创建 Stripe PaymentIntent
- 服务端价格验证（防止客户端篡改）
- 库存检查
- 计算运费和税费
- 返回 clientSecret 给客户端

#### `netlify/functions/stripe-webhook.ts`
- 接收 Stripe webhook 事件
- 验证 webhook 签名
- 处理 `payment_intent.succeeded` 事件：
  - 创建订单记录
  - 创建订单项
  - 更新库存
  - 发送确认邮件（待实现）
- 处理 `payment_intent.payment_failed` 事件

### 3. Vue 组件

#### `src/composables/useStripe.ts`
- Stripe.js 加载
- Elements 初始化
- Card Element 挂载
- 支付确认
- 自动清理

#### `src/views/CheckoutView.vue`
- 联系信息表单（邮箱）
- 配送地址表单
- Stripe Card Element 集成
- 订单摘要
- 支付处理
- 表单验证
- 响应式设计

#### `src/views/OrderConfirmationView.vue`
- 订单确认页面
- 显示订单号
- 显示订单详情
- 继续购物按钮
- 查看订单按钮

### 4. 路由配置
- `/checkout` - 结账页面
- `/order-confirmation` - 订单确认页面

### 5. 环境配置
- `VITE_STRIPE_PUBLISHABLE_KEY` - 客户端 publishable key
- `STRIPE_SECRET_KEY` - 服务端 secret key
- `STRIPE_WEBHOOK_SECRET` - webhook 签名验证

## 📋 待完成的步骤

### 1. 获取 Stripe API Keys
1. 登录 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 进入 Developers > API keys
3. 复制 Publishable key 和 Secret key
4. 更新 `.env` 文件

### 2. 配置 Stripe Webhook
1. 在 Stripe Dashboard 中进入 Developers > Webhooks
2. 添加 endpoint：
   - URL: `https://your-domain.netlify.app/.netlify/functions/stripe-webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
3. 复制 webhook signing secret
4. 更新 `.env` 文件中的 `STRIPE_WEBHOOK_SECRET`

### 3. 本地测试
```bash
# 启动 Netlify 开发服务器（包含 Functions）
npm run netlify:dev

# 在另一个终端运行测试
npm run test:functions
```

### 4. 生产部署
```bash
# 构建项目
npm run build

# 部署到 Netlify
netlify deploy --prod
```

## 🔧 集成测试流程

### 测试结账流程
1. 添加商品到购物车
2. 点击 "Proceed to Checkout"
3. 填写联系信息和配送地址
4. 使用 Stripe 测试卡号：
   - 卡号: `4242 4242 4242 4242`
   - 有效期: 任意未来日期
   - CVC: 任意 3 位数字
5. 点击 "Place Order"
6. 验证订单确认页面显示正确

### 验证数据库
1. 登录 Supabase Dashboard
2. 进入 Table Editor
3. 检查 `orders` 表是否有新订单
4. 检查 `order_items` 表是否有对应的订单项

### 验证 Webhook
1. 在 Stripe Dashboard 中查看 webhook 日志
2. 确认 webhook 成功接收并处理
3. 检查订单状态是否更新为 "paid"

## 🚨 注意事项

### 安全
- 永远不要在客户端暴露 `STRIPE_SECRET_KEY`
- 所有价格计算必须在服务端完成
- 使用 webhook 签名验证确保请求来自 Stripe
- 定期轮换 API keys

### 错误处理
- 处理支付失败的情况
- 处理库存不足的情况
- 处理网络错误
- 提供用户友好的错误消息

### 性能
- 使用 Stripe Elements 的内置优化
- 避免重复创建 PaymentIntent
- 使用数据库事务确保数据一致性

## 📚 参考资源

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Supabase Documentation](https://supabase.com/docs)

## 🎯 下一步

1. 完成 Stripe API keys 配置
2. 设置 webhook endpoint
3. 进行完整的端到端测试
4. 部署到生产环境
5. 监控支付情况和错误日志
