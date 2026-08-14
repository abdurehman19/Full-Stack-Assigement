import React from 'react'
import AnnouncementBar from '../topbar/AnnouncementBar'
import Hero from '../hero/Hero'
import Marque from '../marque/Marque'
import NewArrivals from '../newarrival/NewArrivals'

function Home() {
  return(
    <>
    <Hero/>
    <Marque/>
    <NewArrivals/>
    </>
  )
}

export default Home