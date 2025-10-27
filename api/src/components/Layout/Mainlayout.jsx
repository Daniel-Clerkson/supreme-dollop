import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import ScrollToTop from '../../ScrollToTop';

const Mainlayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar onOpenCart={() => setCartOpen(true)} />
        <Outlet />
    </div>
  )
}

export default Mainlayout