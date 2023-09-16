export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-nowrap h-12 fixed top-0 w-full justify-around bg-[#D3D3D3] ">
        <a href='/' class="navbar_b ml-4 hover:px-8 hover:ml-0">首页</a>{/* 外边距变成了内边距,图标不会移动 */}
        
        <a href='/1' class="navbar_b">分类</a>
        <a href='/1' class="navbar_b grow">搜索</a>
        <a href='/login' class="navbar_b">登录</a>
        <a href='/register' class="navbar_b">注册</a>
        <a href='/1' class="navbar_b">摸鱼</a>
        <a href='/1' class="navbar_b">摸鱼</a>
        <a href='/1' class="navbar_b">摸鱼</a>
      </div>
    </main>
  )
}
