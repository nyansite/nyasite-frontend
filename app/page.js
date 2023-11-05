import Navbar from "./Navbar.js"
import Sidebar from "./Sidebar.js"
export default function Home() {
  return (
    <main className="gap-4">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <div>114514</div>
      </div>
    </main>
  )
}
