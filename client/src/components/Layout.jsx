import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import '../styles/Layout.css'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <TopBar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
