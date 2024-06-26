import React from "react"
import { Movie } from "../types"
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline"
import { useCustomContext } from "@/custom-context"

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { movies, setMovies } = useCustomContext()
  const ratioLikes = (movie.likes / (movie.likes + movie.dislikes)) * 100

  const handleLikes = (like: boolean) => {
    setMovies(
      movies.map((m) => {
        if (m.id !== movie.id) return m

        return {
          ...m,
          likes: like ? m.likes + 1 : m.likes,
          dislikes: like ? m.dislikes : m.dislikes + 1,
        }
      })
    )
  }
  return (
    <div className="p-2 rounded-lg shadow-md hover:shadow-xl transition-all space-y-1">
      <img
        className="object-cover w-40 aspect-[9/16]"
        src="https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg"
        alt="movie_poster"
      />
      <b className="text-gray-900">{movie.title}</b>
      <p className="text-gray-400 text-sm">{movie.category}</p>
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={() => handleLikes(true)}
          className="p-1 rounded hover:bg-gray-100"
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
          onClick={() => handleLikes(false)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <HandThumbDownIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
export default MovieCard
