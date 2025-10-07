import React from 'react'
import Logo from '../assets/Images/Logo.png'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='sm:flex items-center justify-center'>
      <div className='justify-center flex items-start bg-white rounded-2xl mt-10 w-full sm:w-11/12 p-8 flex-col sm:flex-row'>
        <div className='first w-2/4 text-center'>
            <img src={Logo} alt="" className='size-36'/>
            <p>Bringing people together through flavour, warmth, and unforgettable experiences.</p>
            <div className="icons flex mt-5">
                <FaFacebook className='text-2xl m-2'/>
                <FaInstagram className='text-2xl m-2' />
                <FaTiktok className='text-2xl m-2'/>
                <FaYoutube className='text-2xl m-2'/>
            </div>
        </div>
        <div className='second w-1/4'>
            <p className="head font-semibold mb-5">
                Quick Links
            </p>
            <ul  className='text-sm'>
                <li>Home</li>
                <li>About Us</li>
                <li>Weddings</li>
                <li>Corporate</li>
                <li>Schools</li>
                <li>Help</li>
            </ul>
        </div>
        <div className='third w-1/4'>
            <p className="head font-semibold mb-5">
                Legals
            </p>
            <ul className='text-sm'>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Allergens and Dietary Disclaimer</li>
                <li>Refund and Cancellation Policy</li>
            </ul>
        </div>
        <div className='second w-1/4'>
            <p className="head font-semibold mb-5">
                Location & Contact
            </p>
            <ul className='text-sm'>
                <li>London UK</li>
                <li>Email: hello@vyskcatering.com</li>
                <li>Phone: +234 800 123 4567</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
