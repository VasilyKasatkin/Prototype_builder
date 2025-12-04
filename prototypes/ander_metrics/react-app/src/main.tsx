import React from 'react'
import { createRoot } from 'react-dom/client'
import MyProgressDashboard from './MyProgressDashboard'
import './index.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <MyProgressDashboard />
  </React.StrictMode>
)
