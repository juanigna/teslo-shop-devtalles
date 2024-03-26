"use client"

import Link from "next/link"
import clsx from "clsx"
import { useUIStore } from "@/store"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShieldOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeSideMenu = useUIStore(state => state.closeSideMenu)

  return (
    <div className="">

        {
            isSideMenuOpen && (
                
                // Background black
                <div 
                    className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                />
            )
        }

        {
            isSideMenuOpen && (
                // Blur
                <div 
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                />
            )
        }

        

        {/* Sidemenu */}
        <nav 
            // TODO efecto slide
            className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        'translate-x-full': !isSideMenuOpen
                    }
                )
            }
        >
            <IoCloseOutline 
                size={50} 
                className="absolute top-5 right-5 cursor-pointer"
                onClick={closeSideMenu}
            />

            {/* Input */}

            <div className="relative mt-14">
                <IoSearchOutline size={20} className="absolute top-2 left-2"/>
                <input 
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Menu */}

            <Link 
                href={'/'} 
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoPersonOutline size={30}/>
                <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link 
                href={'/'} 
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoTicketOutline size={30}/>
                <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link 
                href={'/'} 
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoLogInOutline size={30}/>
                <span className="ml-3 text-xl">Log in</span>
            </Link>

            <Link 
                href={'/'} 
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoLogOutOutline size={30}/>
                <span className="ml-3 text-xl">Log out</span>
            </Link>

            {/* Separator */}
            <div  className="w-full h-px bg-gray-200 my-10"/>

            <Link 
                href={'/'} 
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoShieldOutline size={30}/>
                <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link 
                href={'/'} 
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoTicketOutline size={30}/>
                <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link 
                href={'/'} 
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoPeopleOutline size={30}/>
                <span className="ml-3 text-xl">Usuarios</span>
            </Link>

        </nav>

    </div>
  )
}

