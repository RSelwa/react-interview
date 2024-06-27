import { Movie } from "@/types"
import React, { createContext, useContext, useState } from "react"

const CustomContext = createContext({
  movies: [] as Movie[],
  setMovies: (movies: Movie[]) => {},
})

export const CustomProvider = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([])

  return (
    <CustomContext.Provider value={{ movies, setMovies }}>
      {children}
    </CustomContext.Provider>
  )
}

export const useCustomContext = () => {
  return useContext(CustomContext)
}
