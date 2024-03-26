"use client"

import { generatePagination } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";

interface Props {
    totalPages: number;

}

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1
    let currentPage = isNaN(+pageString) ? 1 : +pageString;

    if(currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName)
    }

    const allPages = generatePagination(currentPage, totalPages)

    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams( searchParams )
        if (pageNumber === "...") {
            return `${pathName}?${ params.toString() }`
        }

        if (+pageNumber <= 0) {
            return `${pathName}`
        }

        if (+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}`
        }

        params.set('page', pageNumber.toString())

        return `${pathName}?${params.toString()}`
    }

    return (
        <div className="flex text-center justify-center items-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex items-center list-style-none">
                <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}
                        >
                            <IoChevronBackCircleOutline size={30}/>
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (
                            <li key={page} className="page-item">
                                <a
                                    className={
                                        clsx(
                                            "page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {
                                                "bg-blue-500 shadow-sm text-white hover:bg-blue-400": page === currentPage,
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}
                                >
                                    { page }
                                </a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}
                        >
                            <IoChevronForwardCircleOutline size={30}/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

