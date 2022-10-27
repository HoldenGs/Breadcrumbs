import React from "react"
import {createRoot} from "react-dom/client"

import App from "./App"

import "./scss/style.scss"

const root = createRoot(document.getElementById("root"))
root.render(<App />)
