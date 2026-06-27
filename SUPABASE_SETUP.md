# Supabase 数据库设置指南

## 1. 运行数据库迁移

在 Supabase Dashboard 中执行以下 SQL：

### 方法 A：使用 Supabase Dashboard（推荐）

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard/organization/gcsshuvfzuinevacraao)
2. 进入 SQL Editor
3. 复制 `supabase/migrations/001_initial_schema.sql` 的全部内容
4. 粘贴到 SQL Editor 并运行
5. 验证表是否创建成功：
   - `orders` 表
   - `order_items` 表
   - 相关索引和触发器

### 方法 B：使用 Supabase CLI（可选）

```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录
supabase login

# 链接项目
supabase link --project-ref gcsshuvfzuinevacraao

# 运行迁移
supabase db push
```

## 2. 验证表结构

运行以下 SQL 查询验证表是否创建成功：

```sql
-- 检查 orders 表
SELECT * FROM orders LIMIT 1;

-- 检查 order_items 表
SELECT * FROM order_items LIMIT 1;

-- 检查索引
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'orders';
```

## 3. 测试订单创建

在 Supabase SQL Editor 中运行以下测试查询：

```sql
-- 插入测试订单
INSERT INTO orders (
  email,
  status,
  subtotal_cents,
  shipping_cents,
  tax_cents,
  total_cents,
  currency,
  shipping_address
) VALUES (
  'test@example.com',
  'pending',
  59900,
  2500,
  0,
  62400,
  'USD',
  '{"firstName": "John", "lastName": "Doe", "address": "123 Main St", "city": "New York", "state": "NY", "zipCode": "10001", "country": "US"}'
) RETURNING *;

-- 插入测试订单项
INSERT INTO order_items (
  order_id,
  product_id,
  variant_id,
  quantity,
  unit_price_cents,
  total_cents,
  product_name,
  variant_name
) VALUES (
  (SELECT id FROM orders WHERE email = 'test@example.com' ORDER BY created_at DESC LIMIT 1),
  'lumenfly-mini',
  'standard-kit',
  1,
  59900,
  59900,
  'Camera Drone',
  'Standard Kit'
) RETURNING *;
```

## 4. 配置 Row Level Security (RLS)

迁移脚本已启用 RLS 并创建了基本策略。在生产环境中，你可能需要：

1. **限制订单查询**：只允许用户查询自己的订单（通过 email 匹配）
2. **限制订单创建**：添加额外的验证逻辑
3. **服务角色访问**：Netlify Functions 使用 service_role key 绕过 RLS

### 推荐的 RLS 策略（生产环境）

```sql
-- 允许用户查询自己的订单
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT
  USING (email = current_setting('request.jwt.claim.email', true));

-- 允许系统创建订单
CREATE POLICY "Service role can manage all orders" ON orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

## 5. 环境变量配置

确保以下环境变量已设置：

### 客户端（Vite）
- `VITE_SUPABASE_URL`: https://gcsshuvfzuinevacraao.supabase.co
- `VITE_SUPABASE_ANON_KEY`: [从 .env 文件获取]

### 服务端（Netlify Functions）
- `SUPABASE_SERVICE_ROLE_KEY`: [从 .env 文件获取]

## 6. 下一步

数据库设置完成后，继续实施：
- M5: Stripe 支付集成
- M6: 订单查询页面
- M7: 税费和运费计算
