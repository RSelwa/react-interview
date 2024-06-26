import { Movie } from "@/types"
import React, { createContext, useContext, useState } from "react"

// Créer le contexte
const CustomContext = createContext({
  movies: [] as Movie[],
  setMovies: (movies: Movie[]) => {},
})

// Créer un fournisseur de contexte
export const CustomProvider = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([])

  return (
    <CustomContext.Provider value={{ movies, setMovies }}>
      {children}
    </CustomContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useCustomContext = () => {
  return useContext(CustomContext)
}
