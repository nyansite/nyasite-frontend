import Navbar from "./Navbar.js"
import Sidebar from "./Sidebar.js"
export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <div>114514</div>
      </div>
    </main>
  )
}
