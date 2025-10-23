import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const Mainlayout = () => {
  return (
    <div>
      <Navbar onOpenCart={() => setCartOpen(true)} />
        <Outlet />
    </div>
  )
}

export default Mainlayout