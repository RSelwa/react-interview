import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import App from "@/App"
import { CustomProvider } from "@/custom-context"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CustomProvider>
  </React.StrictMode>
)
