import { cookies } from 'next/headers'
 
export default function setAuthSession(token:string) {
  const cookieStore = cookies()
  cookieStore.set({
    name: 'akookie',
    value: token,
    httpOnly: true,
  })
}