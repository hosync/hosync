import { sql as sqlQuery } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env
const connectionString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

const queryClient = postgres(connectionString)

export const db = drizzle(queryClient, {
  logger: process.env.DB_DEBUG === 'true'
})

export const sql = sqlQuery
export type SQL = typeof sql
export type DB = typeof db

export * from './db/schemas/agent'
export * from './db/schemas/asr'
export * from './db/schemas/asset'
export * from './db/schemas/business'
export * from './db/schemas/cancellation'
export * from './db/schemas/commission'
export * from './db/schemas/employee'
export * from './db/schemas/fee'
export * from './db/schemas/guest'
export * from './db/schemas/housekeeping'
export * from './db/schemas/invoice'
export * from './db/schemas/photo'
export * from './db/schemas/property'
export * from './db/schemas/reservation'
export * from './db/schemas/room'
export * from './db/schemas/setting'
export * from './db/schemas/tier'
export * from './db/schemas/unit'
export * from './db/schemas/user'
