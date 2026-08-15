import React from 'react'
import AnnouncementBar from '../topbar/AnnouncementBar'
import Hero from '../hero/Hero'
import Marque from '../marque/Marque'
import NewArrivals from '../newarrival/NewArrivals'
import Topselling from '../topselling/Topselling'
import DressStyle from '../dressstyle/DressStyle'
import HappyCustomers from '../happycostomers/HappyCustomers'
import Newsletter from '../newsletter/Newsletter'
import Footer from '../footer/Footer'

function Home() {
  return(
    <>
    <Hero/>
    <Marque/>
    <NewArrivals/>
    <Topselling/>
    <DressStyle/>
    <HappyCustomers/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home