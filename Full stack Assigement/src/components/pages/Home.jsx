import React from 'react'
import AnnouncementBar from '../topbar/AnnouncementBar'
import Hero from '../hero/Hero'
import Marque from '../marque/Marque'
import NewArrivals from '../newarrival/NewArrivals'
import Topselling from '../topselling/Topselling'
import DressStyle from '../dressstyle/DressStyle'

function Home() {
  return(
    <>
    <Hero/>
    <Marque/>
    <NewArrivals/>
    <Topselling/>
    <DressStyle/>
    </>
  )
}

export default Home