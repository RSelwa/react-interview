import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import App from "@/App"
import { CustomProvider } from "@/custom-context"
import { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomProvider>
      <BrowserRouter>
        <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e1e1e1">
          <App />
        </SkeletonTheme>
      </BrowserRouter>
    </CustomProvider>
  </React.StrictMode>
)
