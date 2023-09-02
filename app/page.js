import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href='/login'>登录</a>
      <a href='/register'>注册</a>
    </main>
  )
}
