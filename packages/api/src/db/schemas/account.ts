import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { user } from './user'

export const account = pgTable('account', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  image: varchar('image', { length: 255 }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  expiresAt: timestamp('expiresAt'),
  scope: varchar('scope', { length: 255 }),
  tokenType: varchar('tokenType', { length: 255 }),
  idToken: text('idToken'),
  provider: varchar('provider', { length: 255 }),
  providerAccountId: varchar('providerAccountId', { length: 255 }),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type User = typeof user
export type UserFields = typeof user.$inferSelect
