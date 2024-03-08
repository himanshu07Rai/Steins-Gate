import { cookies } from 'next/headers'
 
export default function getAuthSession() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('akookie')
  return authToken
}