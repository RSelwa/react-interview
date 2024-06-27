import { API_TOKEN } from "@/constants"

export const getMovieByTitle = async (title: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    title
  )}&include_adult=false&language=fr-FR&page=1`

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  }
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}

export const fetchMoviesImages = async (movieId: string) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/images`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  }
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
