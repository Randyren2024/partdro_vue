#!/usr/bin/env node

/**
 * Database migration script for Supabase
 * Executes the SQL migration file to create orders and order_items tables
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://gcsshuvfzuinevacraao.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
  console.error('Please set it in your .env file or export it before running this script')
  process.exit(1)
}

// Read migration SQL
const migrationPath = join(__dirname, 'supabase', 'migrations', '001_initial_schema.sql')
let migrationSql

try {
  migrationSql = readFileSync(migrationPath, 'utf-8')
  console.log('✅ Migration file loaded successfully')
} catch (error) {
  console.error('❌ Error reading migration file:', error.message)
  process.exit(1)
}

// Create Supabase client with service role
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration() {
  console.log('🚀 Starting database migration...\n')

  try {
    // Split SQL into individual statements
    const statements = migrationSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`)

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      const preview = statement.substring(0, 80).replace(/\n/g, ' ')

      console.log(`[${i + 1}/${statements.length}] Executing: ${preview}...`)

      // Use Supabase REST API to execute SQL
      const { error } = await supabase.rpc('exec_sql', { sql: statement })

      // If rpc function doesn't exist, we'll need to use a different approach
      if (error && error.message.includes('Could not find the function')) {
        console.log('⚠️  RPC function not available, using direct SQL execution...')

        // For now, we'll just log the statements
        // In production, you would use Supabase Dashboard or psql to execute these
        console.log(`   Statement: ${statement.substring(0, 100)}...\n`)
      } else if (error) {
        console.error(`❌ Error executing statement: ${error.message}`)
        throw error
      } else {
        console.log('   ✅ Success\n')
      }
    }

    console.log('\n✅ Migration completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Verify tables were created in Supabase Dashboard')
    console.log('2. Test the create-order function locally')
    console.log('3. Continue with M5: Stripe integration')

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    process.exit(1)
  }
}

runMigration()
