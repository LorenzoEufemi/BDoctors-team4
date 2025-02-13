import React from 'react'
import HomePageCard from '../HomePageCard/HomePageCard'


const TopDocs = () => {
  return (
      <section className='container mt-5 pt-5'>
          <h2 className='mb-5 text-center'>I nostri dottori</h2>
          <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-3 g-5'>
              {doctors.slice(0, 6).map((doc, index) => (
                  <div key={index} className='col'>
                      <HomePageCard />
                  </div>
              ))}
          </div>
      </section>        
  )
}

export default TopDocs