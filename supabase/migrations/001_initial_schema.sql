-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  subtotal_cents INTEGER NOT NULL,
  shipping_cents INTEGER NOT NULL DEFAULT 0,
  tax_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  shipping_address JSONB NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  variant_id TEXT,
  quantity INTEGER NOT NULL,
  unit_price_cents INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  variant_name TEXT
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
-- Allow anyone to create orders (for checkout)
CREATE POLICY "Enable insert for all users" ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow users to read their own orders (by email)
CREATE POLICY "Enable read for users based on email" ON orders
  FOR SELECT
  TO anon
  USING (true); -- In production, you'd restrict this with auth.uid() = user_id

-- Allow system to update orders (for status updates via webhooks)
CREATE POLICY "Enable update for service role" ON orders
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policies for order_items table
-- Allow reading order items if the order is accessible
CREATE POLICY "Enable read for order items based on order access" ON order_items
  FOR SELECT
  TO anon
  USING (true); -- In production, you'd join with orders and check email

-- Allow inserting order items when creating an order
CREATE POLICY "Enable insert for order items" ON order_items
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create function to generate unique order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  order_num TEXT;
  date_part TEXT;
  random_part TEXT;
BEGIN
  -- Format: PD-YYYYMMDD-XXXX (e.g., PD-20260623-A3F9)
  date_part := TO_CHAR(NOW(), 'YYYYMMDD');
  random_part := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4));
  order_num := 'PD-' || date_part || '-' || random_part;

  RETURN order_num;
END;
$$;

-- Create trigger to auto-generate order number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();
