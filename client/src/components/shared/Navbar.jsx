import { IoNotificationsOutline } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { House } from "lucide-react"

const Navbar = () => {
  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-md border-b flex items-center justify-between">

      <div className="flex items-center gap-2 ">
        <img src="/icon.png" alt="" className="w-9 h-9" />
        <h1 className="font-semibold text-2xl">
          Task<span className="text-blue-600">Zen</span>
        </h1>
      </div>
      <div className="hidden md:flex items-center gap-8 text-md font-medium text-gray-600">
        <Link to="/" className="hover:text-purple-600 transition flex gap-2 items-center">Dashboard</Link>
        <Link to="/tasks" className="hover:text-purple-600 transition">Task</Link>
        <Link to="/projects" className="hover:text-purple-600 transition">Project</Link>
        <Link to="/members" className="hover:text-purple-600 transition">Members</Link>
        <Link to="/team" className="hover:text-purple-600 transition">Team</Link>
        <Link to="/settings" className="hover:text-purple-600 transition">Setting</Link>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative cursor-pointer">
          <div className="bg-[#F3F2FB] p-2 rounded-full hover:bg-purple-100 transition">
            <IoNotificationsOutline size={20} />
          </div>

          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

      </div>
    </div>
  )
}

export default Navbar