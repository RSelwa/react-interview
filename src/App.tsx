import React, { useEffect } from "react"
import MovieCard from "@components/movie-card"
import { useSearchParams } from "react-router-dom"
import { movies$ } from "../movies"
import { Movie } from "@/types"
import { useCustomContext } from "@/custom-context"
import Header from "@/components/header"
import {
  baseUrlImg,
  defaultNumberOfElementsPerPage,
  defaultPage,
  defaultUrlImg,
} from "@/constants"
import { fetchMoviesImages, getMovieByTitle } from "@/lib"

const App = () => {
  const { movies, setMovies } = useCustomContext()
  const [searchParams] = useSearchParams()
  const numberOfElementsPerPage =
    parseInt(searchParams.get("n")) || defaultNumberOfElementsPerPage
  const categoryFilter = searchParams.get("c")
  const pagination = parseInt(searchParams.get("p")) || defaultPage
  const startIndex = (pagination - 1) * numberOfElementsPerPage
  const endIndex = startIndex + numberOfElementsPerPage

  const fetchMovies = async () => {
    const moviesList = (await movies$) as Movie[]
    try {
      const allImgUrl = await Promise.all(
        moviesList.map(async (movie) => {
          const { results } = await getMovieByTitle(movie.title)
          const idFirstResult = results[0].id

          const { posters } = await fetchMoviesImages(idFirstResult)
          const posterUrl = posters[0].file_path
          const url = posterUrl ? baseUrlImg + posterUrl : defaultUrlImg

          return url as string
        })
      )
      moviesList.map((movie, index) => {
        movie.imgUrl = allImgUrl[index] as string
      })
    } catch (error) {
      console.error(error)
    }
    setMovies(moviesList)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <Header />
      <section className="flex flex-wrap justify-center gap-4 mx-auto w-10/12 py-4">
        {movies
          .filter((movie) =>
            categoryFilter ? movie.category === categoryFilter : movie
          )
          .slice(startIndex, endIndex)
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </section>
    </main>
  )
}

export default App
