import React from 'react'
import LegalHeroImg from './LegalHeroImg'
import Footer from '../Footer'

const LegalHero = () => {
  return (
    <div>
      <LegalHeroImg />
      <div  className='absolute flex justify-center items-center flex-col text-center w-full top-30 sm:top-60  text-sm'>
        <p className='text-5xl font-extrabold mb-10'>Privacy Policy</p>
        <p>At Vys'k, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
      </div>
      <Footer />
    </div>
  )
}

export default LegalHero
