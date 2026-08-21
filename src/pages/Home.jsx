import Hero from '../hero/Hero'
import Marque from '../marque/Marque'
import NewArrivals from '../newarrival/NewArrivals'
import Topselling from '../topselling/Topselling'
import DressStyle from '../dressstyle/DressStyle'
import HappyCustomers from '../happycostomers/HappyCustomers';

function Home() {
  return(
    <>
    <Hero/>
    <Marque/>
    <NewArrivals/>
    <Topselling/>
    <DressStyle/>
    <HappyCustomers/>
      </>
  )
}

export default Home