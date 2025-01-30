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

export * from './schemas/agent'
export * from './schemas/asr'
export * from './schemas/asset'
export * from './schemas/business'
export * from './schemas/cancellation'
export * from './schemas/commission'
export * from './schemas/employee'
export * from './schemas/fee'
export * from './schemas/guest'
export * from './schemas/housekeeping'
export * from './schemas/invoice'
export * from './schemas/photo'
export * from './schemas/property'
export * from './schemas/reservation'
export * from './schemas/room'
export * from './schemas/setting'
export * from './schemas/tier'
export * from './schemas/unit'
export * from './schemas/user'
