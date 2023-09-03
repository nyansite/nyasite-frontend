export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row flex-nowrap h-12 fixed top-0 left-0 right-0 justify-around bg-white ">
        
        <a href='/login' className="flex text-center h-full items-center">登录</a>
        <a href='/register' className="flex text-center h-full items-center">注册</a>
      </div>

    </main>
  )
}
