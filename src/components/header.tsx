import {
  defaultNumberOfElementsPerPage,
  defaultPage,
  pagination,
  paramsMapping,
} from "@/constants/index"
import { useCustomContext } from "@/custom-context"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import React from "react"
import { useSearchParams } from "react-router-dom"
const Separator = () => <span className="w-0.5 h-12 bg-gray-200" />

const Header = () => {
  const { movies } = useCustomContext()
  const moviesCategories = [...new Set(movies.map((movie) => movie.category))]

  const [searchParams, setSearchParams] = useSearchParams()
  const numberOfElementsPerPage =
    searchParams.get(paramsMapping.N) ||
    defaultNumberOfElementsPerPage.toString()
  const categoryFilter = searchParams.get(paramsMapping.C) || "default"

  const hasFilters =
    searchParams.get(paramsMapping.C) || searchParams.get(paramsMapping.N)

  const updateSearchParams = (newParams) => {
    const updatedParams = new URLSearchParams(searchParams)

    Object.keys(newParams).forEach((key) => {
      updatedParams.set(key, newParams[key])
    })

    setSearchParams(updatedParams)
  }

  const filterMovies = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(paramsMapping.C, category)
    newSearchParams.delete(paramsMapping.P)
    if (category === "default") newSearchParams.delete(paramsMapping.C)
    setSearchParams(newSearchParams)
  }

  const changeNumberOfElements = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(paramsMapping.N, value)
    newSearchParams.delete(paramsMapping.P)
    setSearchParams(newSearchParams)
  }

  const changePagination = (nextPage: boolean) => {
    const currentPage =
      parseInt(searchParams.get(paramsMapping.P)) || defaultPage
    const numberOfElementsPerPage =
      parseInt(searchParams.get(paramsMapping.N)) ||
      defaultNumberOfElementsPerPage
    const categoryFilter = searchParams.get(paramsMapping.C)

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
  const clearFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete(paramsMapping.C)
    newSearchParams.delete(paramsMapping.P)
    newSearchParams.delete(paramsMapping.N)
    setSearchParams(newSearchParams)
  }

  return (
    <header className="fixed bottom-4 z-50 bg-slate-700 left-1/2 -translate-x-1/2 rounded-md p-3 items-center justify-center flex gap-2  ">
      <button
        title="Page précédente"
        className="flex rounded-md  items-center hover:bg-slate-800  justify-center gap-2 bg-slate-500 px-4 text-white h-11"
        onClick={() => changePagination(false)}
      >
        <ArrowLeftIcon className="size-4 text-white" />
      </button>
      <Separator />

      <div className="flex rounded-md items-center justify-center gap-2 bg-slate-500 p-2">
        <p className="text-slate-300">Catégorie</p>
        <select
          onChange={(e) => filterMovies(e.target.value)}
          className="border-t-0 border-x-0 border-b border-slate-300 bg-transparent text-white font-semibold outline-none appearance-none px-2 py-px cursor-pointer"
          value={categoryFilter}
        >
          <option value="default" className="bg-slate-700">
            Sélectionner une catégorie
          </option>
          {moviesCategories.map((categorie, i) => (
            <option key={i} className="bg-slate-700">
              {categorie}
            </option>
          ))}
        </select>
      </div>

      <Separator />
      <div className="flex rounded-md items-center justify-center gap-2 bg-slate-500 p-2">
        <p className="text-slate-300">Nombres de films:</p>

        <select
          onChange={(e) => changeNumberOfElements(e.target.value)}
          className="border-t-0 border-x-0 border-b border-slate-300 bg-transparent text-white font-semibold outline-none appearance-none px-2 py-px cursor-pointer w-12"
          value={numberOfElementsPerPage}
        >
          {pagination.map((page, i) => (
            <option className="bg-slate-700 " key={i} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
      <Separator />
      <button
        title="Page suivante"
        className="flex rounded-md  items-center hover:bg-slate-800  justify-center gap-2 bg-slate-500 px-4 text-white h-11"
        onClick={() => changePagination(true)}
      >
        <ArrowRightIcon className="size-4 text-white" />
      </button>
      {hasFilters && (
        <>
          <Separator />
          <button
            title="Enlever les filtres"
            onClick={clearFilter}
            className="flex rounded-md  items-center hover:bg-red-700   justify-center gap-2 bg-red-500 px-4 text-white h-11"
          >
            <TrashIcon className="size-4" />
          </button>
        </>
      )}
    </header>
  )
}

export default Header
