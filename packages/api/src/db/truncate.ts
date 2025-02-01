import { sql } from 'drizzle-orm'

import { db } from '..'

const clearDb = async (): Promise<void> => {
  try {
    // Fetch all table names from PostgreSQL system catalog
    const tables = await db.execute<{ tablename: string }>(
      sql.raw(`
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
      `)
    )

    // Extract table names
    const tableNames = tables.map((row) => row.tablename)

    if (tableNames.length === 0) {
      console.log('No tables found to truncate.')
      process.exit(0)
    }

    // Construct TRUNCATE query dynamically with CASCADE
    const truncateQuery = `TRUNCATE TABLE ${tableNames.map((t) => `"${t}"`).join(', ')} CASCADE;`

    // Execute truncation
    await db.execute(sql.raw(truncateQuery))

    console.log('Database cleared')
  } catch (error) {
    console.error('Error clearing database:', error)
  } finally {
    process.exit()
  }
}

clearDb()
