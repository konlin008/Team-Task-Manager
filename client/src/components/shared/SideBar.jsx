import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { MdTaskAlt } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FaCalendar } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const menu = [
    { name: "Dashboard", icon: IoHomeSharp, active: true },
    { name: "Task", icon: MdTaskAlt },
    { name: "project", icon: MdTaskAlt },
    { name: "Members", icon: RiTeamFill },
    { name: "Team", icon: RiTeamFill },
    { name: "Calendar", icon: FaCalendar },
    { name: "Setting", icon: IoMdSettings },
];

const SideBar = () => {
    return (
        <div className="w-64 h-screen px-4 py-6 bg-linear-to-b from-neutral-50 to-violet-300 border-r border-white/30 flex flex-col">

            <div className="flex items-center gap-2 px-3 mb-10">
                <img src="/icon.png" alt="" className="w-9 h-9" />
                <h1 className="font-semibold text-2xl">
                    Task<span className="text-blue-600">Zen</span>
                </h1>
            </div>

            <div className="flex flex-col gap-2">
                {menu.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all
                ${item.active
                                    ? "bg-white/80 shadow text-black"
                                    : "text-gray-500 hover:bg-white/50 hover:text-black"
                                }`}
                        >
                            <Icon size={20} />
                            <p className="text-sm font-medium">{item.name}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default SideBar;