import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import '../styles/Layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
