import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuGroup, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent } from "../ui/dropdown-menu"
import useAuthStore from "@/store/useAuthStore"
import { useLogout } from "@/hooks/auth.hook"
import useWorkspaceStore from "@/store/useWorkspaceStore"
import { useState } from "react"
import { Button } from "../ui/button"

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const clearWorkSpace = useWorkspaceStore(state => state.clearWorkspace)
  const { mutate } = useLogout()
  const nav = useNavigate()

  const navLinks = [
    {
      label: 'Dashboard',
      path: '/'
    },
    {
      label: "Project",
      path: "/projects",
    },
    {
      label: "Task",
      path: "/tasks",
    },
  ]
  const [navState, setNavState] = useState('/')

  const handleLogout = () => {
    clearWorkSpace()
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
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`hover:text-purple-600 transition flex gap-2 items-center  border-gray-400 hover:border-purple-600 cursor-pointer ${navState === link.path ? " border-b text-purple-600 border-purple-600"
              : "border-gray-400 hover:text-purple-600 hover:border-purple-600"} `}
            onClick={() => setNavState(link.path)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {
        user ? <div>
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
        </div> : <div>
          <Button
            className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-md shadow-md hover:opacity-90 transition"
            onClick={() => { nav('/login') }}
          >
            Login
          </Button>
        </div>
      }
    </div >
  )
}

export default Navbar