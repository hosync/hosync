import { redirect } from 'next/navigation'

import * as cookies from '@/lib/utils/cookies'

export async function GET() {
  await cookies.del('authjs.session-token')

  redirect('/')
}
