import { eq } from 'drizzle-orm'

import { account as accountTable, db, user as userTable } from '../../..'

export const linkAccount = async (user: any): Promise<any> => {
  const response = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, user.user.email))

  if (response.length === 0) {
    return {
      status: 404,
      message: 'User not found'
    }
  }

  const userResponse = response[0]

  const accountResponse = await db
    .select()
    .from(accountTable)
    .where(eq(accountTable.userId, userResponse.id))

  if (accountResponse.length === 0) {
    return {
      status: 404,
      message: 'Account not found'
    }
  }

  const account = accountResponse[0]

  const updatedAccount = {
    ...account,
    provider: user.account.provider,
    providerAccountId: user.account.providerAccountId,
    accessToken: user.account.access_token,
    refreshToken: user.account.refresh_token,
    scope: user.account.scope
  }

  if (account.providerAccountId === '') {
    const updatedAccountResponse = await db
      .update(accountTable)
      .set(updatedAccount)
      .where(eq(accountTable.id, account.id))

    return [{ ...updatedAccountResponse, ...userResponse }]
  }

  return [{ ...updatedAccount, ...userResponse }]
}
