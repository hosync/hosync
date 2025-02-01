import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { user } from './user'

export const account = pgTable('account', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  provider: varchar('provider', { length: 100 }),
  providerAccountId: varchar('providerAccountId', { length: 255 }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  scope: varchar('scope', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Account = typeof account
export type AccountFields = typeof account.$inferSelect
