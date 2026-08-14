import React from 'react'
import AnnouncementBar from '../topbar/AnnouncementBar'
import Hero from '../hero/Hero'
import Marque from '../marque/Marque'
import NewArrivals from '../newarrival/NewArrivals'
import Topselling from '../topselling/Topselling'

function Home() {
  return(
    <>
    <Hero/>
    <Marque/>
    <NewArrivals/>
    <Topselling/>
    </>
  )
}

export default Home