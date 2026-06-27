# Stripe 配置指南

## 获取 Stripe 测试 API Keys

### 1. 创建 Stripe 账号
1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/register)
2. 注册一个免费账号
3. 验证邮箱

### 2. 获取 API Keys
1. 登录后，点击右上角的 **"Developers"** 菜单
2. 选择 **"API keys"**
3. 你会看到：
   - **Publishable key** (以 `pk_test_` 开头) - 用于客户端
   - **Secret key** (以 `sk_test_` 开头) - 用于服务端

### 3. 更新 .env 文件

打开项目根目录的 `.env` 文件，替换以下占位符：

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_你的_publishable_key
STRIPE_SECRET_KEY=sk_test_你的_secret_key
STRIPE_WEBHOOK_SECRET=whsec_你的_webhook_secret
```

### 4. 配置 Webhook（可选，用于自动处理支付事件）

1. 在 Stripe Dashboard 中，进入 **Developers > Webhooks**
2. 点击 **"Add endpoint"**
3. 输入 endpoint URL:
   - 本地测试: `http://localhost:8888/.netlify/functions/stripe-webhook`
   - 生产环境: `https://your-domain.netlify.app/.netlify/functions/stripe-webhook`
4. 选择要监听的事件：
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. 点击 **"Add endpoint"**
6. 复制 **Signing secret** (以 `whsec_` 开头)
7. 更新 `.env` 文件中的 `STRIPE_WEBHOOK_SECRET`

## 使用 Stripe CLI 进行本地 Webhook 测试（推荐）

如果你在本地开发，可以使用 Stripe CLI 来转发 webhook：

### 1. 安装 Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows (使用 Scoop)
scoop bucket add stripe https://github.com/nicktomlin/scoop-stripe.git
scoop install stripe

# 或者下载二进制文件
# https://github.com/stripe/stripe-cli/releases
```

### 2. 登录 Stripe CLI

```bash
stripe login
```

### 3. 转发 Webhook 到本地

```bash
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
```

这会输出一个 webhook signing secret（以 `whsec_` 开头），将其更新到 `.env` 文件中。

### 4. 触发测试事件

在另一个终端中：

```bash
# 触发支付成功事件
stripe trigger payment_intent.succeeded

# 触发支付失败事件
stripe trigger payment_intent.payment_failed
```

## Stripe 测试卡号

使用以下测试卡号进行支付测试：

### 成功支付
- **卡号**: `4242 4242 4242 4242`
- **有效期**: 任意未来日期（如 12/25）
- **CVC**: 任意 3 位数字（如 123）
- **邮编**: 任意 5 位数字（如 12345）

### 3D Secure 验证
- **卡号**: `4000 0025 0000 3155`
- 会触发 3D Secure 验证流程

### 支付失败
- **卡号**: `4000 0000 0000 0002`
- 会触发支付失败

更多测试卡号：https://stripe.com/docs/testing#cards

## 测试完整购物流程

1. **启动开发服务器**
   ```bash
   npm run netlify:dev
   ```

2. **访问网站**
   - 打开浏览器访问 `http://localhost:8888`

3. **购物流程**
   - 浏览产品 → 选择变体和数量 → 添加到购物车
   - 点击购物车图标 → 查看购物车
   - 点击 "Proceed to Checkout"
   - 填写联系信息和配送地址
   - 输入测试卡号
   - 点击 "Place Order"

4. **验证结果**
   - 检查订单确认页面是否显示
   - 登录 Supabase Dashboard 检查 `orders` 表
   - 检查 `order_items` 表
   - 如果使用 Stripe CLI，检查 webhook 日志

## 常见问题

### Q: 为什么需要测试 keys 而不是生产 keys？
A: Stripe 的测试模式（test mode）使用测试 keys，不会真正扣款。生产 keys 会在真实信用卡上扣款。

### Q: 如何切换到生产模式？
A: 在 Stripe Dashboard 中，点击右上角的 "Test mode" 开关切换到 "Live mode"，然后获取生产 keys。

### Q: Webhook 测试失败？
A: 
1. 确保 Stripe CLI 正在运行
2. 检查 `.env` 中的 `STRIPE_WEBHOOK_SECRET` 是否正确
3. 查看 Netlify Functions 日志：`npx netlify functions:list`

### Q: 如何在生产环境配置 Webhook？
A: 
1. 部署到 Netlify 后，获取网站 URL
2. 在 Stripe Dashboard 中添加 webhook endpoint
3. URL 格式: `https://your-domain.netlify.app/.netlify/functions/stripe-webhook`

## 参考资源

- [Stripe 文档](https://stripe.com/docs)
- [Stripe 测试指南](https://stripe.com/docs/testing)
- [Stripe CLI 文档](https://stripe.com/docs/stripe-cli)
- [Netlify Functions 文档](https://docs.netlify.com/functions/overview/)
