import { IoNotificationsOutline } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuGroup, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent } from "../ui/dropdown-menu"
import useAuthStore from "@/store/useAuthStore"
import { useLogout } from "@/hooks/auth.hook"

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { mutate } = useLogout()
  const nav = useNavigate()
  const handleLogout = () => {
    logout()
    mutate()
    nav("/login")
  }
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => nav('/my-profile')}>Profile</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar