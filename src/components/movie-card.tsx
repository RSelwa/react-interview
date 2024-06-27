import React from "react"
import { Movie } from "../types"
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useCustomContext } from "@/custom-context"
import Skeleton from "react-loading-skeleton"

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { movies, setMovies } = useCustomContext()

  const ratioLikes = (movie.likes / (movie.likes + movie.dislikes)) * 100

  const deleteMovie = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  const handleLikes = (like: boolean) => {
    setMovies(
      movies.map((m) => {
        if (m.id !== movie.id) return m
        const alreadyLiked = m.isLiked
        const alreadyDisliked = m.isDisliked

        const likes = like
          ? alreadyLiked
            ? m.likes
            : m.likes + 1
          : alreadyLiked
          ? m.likes - 1
          : m.likes

        const dislikes = !like
          ? alreadyDisliked
            ? m.dislikes
            : m.dislikes + 1
          : alreadyDisliked
          ? m.dislikes - 1
          : m.dislikes

        const newMovie = {
          ...m,
          isLiked: like,
          isDisliked: !like,
          likes,
          dislikes,
        }

        return newMovie
      })
    )
  }

  return (
    <div className="p-2 relative rounded-lg shadow-md hover:shadow-xl transition-all bg-gray-700 w-52 space-y-1">
      {!movie.imgUrl && (
        <Skeleton className="object-cover w-full  aspect-[9/12] rounded" />
      )}
      {movie.imgUrl && (
        <img
          className="object-cover w-full aspect-[9/12] rounded"
          src={movie.imgUrl}
          alt="movie_poster"
        />
      )}

      <b className="text-gray-200">{movie.title}</b>
      <p className="text-gray-300 text-sm">{movie.category}</p>
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={() => handleLikes(true)}
          data-state={movie.isLiked ? "checked" : null}
          className="p-1 rounded text-green-600 data-[state=checked]:bg-green-200 hover:bg-green-100"
        >
          <HandThumbUpIcon className="size-4" />
        </button>
        <div className="h-0.5  bg-red-300 relative w-full">
          <span
            style={{ width: `${ratioLikes}%` }}
            className="absolute h-full left-0 top-0 bg-green-500"
          />
        </div>
        <button
          data-state={movie.isDisliked ? "checked" : null}
          onClick={() => handleLikes(false)}
          className="p-1 rounded hover:bg-red-100 data-[state=checked]:bg-red-200 text-red-600"
        >
          <HandThumbDownIcon className="size-4" />
        </button>
        <button
          onClick={() => deleteMovie(movie.id)}
          className="p-1 hover:bg-red-100 rounded  hover:text-red-500  text-gray-500 transition-all"
        >
          <TrashIcon className="size-4 stroke-2" />
        </button>
      </div>
    </div>
  )
}
export default MovieCard
