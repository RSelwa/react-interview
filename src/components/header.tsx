import {
  defaultNumberOfElementsPerPage,
  defaultPage,
  pagination,
} from "@/constants/index"
import { useCustomContext } from "@/custom-context"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import React from "react"
import { useSearchParams } from "react-router-dom"
const Separator = () => <span className="w-0.5 h-12 bg-gray-200" />

const Header = () => {
  const { movies } = useCustomContext()
  const moviesCategories = [...new Set(movies.map((movie) => movie.category))]

  const [searchParams, setSearchParams] = useSearchParams()

  const updateSearchParams = (newParams) => {
    const updatedParams = new URLSearchParams(searchParams)

    Object.keys(newParams).forEach((key) => {
      updatedParams.set(key, newParams[key])
    })

    setSearchParams(updatedParams)
  }

  const filterMovies = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("c", category)
    newSearchParams.delete("p")
    if (category === "default") newSearchParams.delete("c")
    setSearchParams(newSearchParams)
  }

  const changeNumberOfElements = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("n", value)
    newSearchParams.delete("p")
    setSearchParams(newSearchParams)
  }

  const changePagination = (nextPage: boolean) => {
    const currentPage = parseInt(searchParams.get("p")) || defaultPage
    const numberOfElementsPerPage =
      parseInt(searchParams.get("n")) || defaultNumberOfElementsPerPage
    const categoryFilter = searchParams.get("c")

    if (!nextPage && currentPage === defaultPage) return
    if (!nextPage)
      updateSearchParams({ ...searchParams, p: (currentPage - 1).toString() })

    const moviesWithFilters = movies.filter((movie) =>
      categoryFilter ? movie.category === categoryFilter : movie
    )
    const totalPages = Math.ceil(
      moviesWithFilters.length / numberOfElementsPerPage
    )

    if (nextPage && currentPage < totalPages) {
      updateSearchParams({ ...searchParams, p: (currentPage + 1).toString() })
      return
    }
  }

  return (
    <header className="w-full items-center justify-center flex gap-8 py-4 bg-gray-700">
      <button onClick={() => changePagination(false)}>
        <ArrowLeftIcon className="size-4 text-white" />
      </button>
      <Separator />

      <p className="text-gray-200">Catégorie</p>
      <select
        onChange={(e) => filterMovies(e.target.value)}
        className="border-none rounded outline-none appearance-none px-2 py-px"
      >
        <option defaultChecked value="default">
          Sélectionner une catégorie
        </option>
        {moviesCategories.map((categorie, i) => (
          <option key={i}>{categorie}</option>
        ))}
      </select>
      <Separator />
      <p className="text-gray-200">Nombres de films:</p>

      <select
        onChange={(e) => changeNumberOfElements(e.target.value)}
        className="border-none rounded outline-none appearance-none px-2 py-px"
        defaultValue={defaultNumberOfElementsPerPage.toString()}
      >
        {pagination.map((page, i) => (
          <option key={i} value={page}>
            {page}
          </option>
        ))}
      </select>
      <Separator />
      <button onClick={() => changePagination(true)}>
        <ArrowRightIcon className="size-4 text-white" />
      </button>
    </header>
  )
}

export default Header
