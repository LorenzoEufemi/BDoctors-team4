import React, { useEffect, useState } from 'react'
import HomePageCard from '../HomePageCard/HomePageCard'

const TopDocs = () => {

  return (
      <section className='mt-5 pt-5'>
          <h2 className='mb-5 text-center'>I nostri dottori</h2>
          <div className='row justify-content-center row-gap-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 mb-5 px-sm-3'>
             <HomePageCard />
          </div>
      </section>        
  )
}

export default TopDocs;