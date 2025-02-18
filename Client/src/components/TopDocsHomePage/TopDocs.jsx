import React from 'react';
import HomePageCard from '../HomePageCard/HomePageCard';

function TopDocs() {

  return (
      <section className='top-docs'>
          <h2 className='mb-5 text-center' style={{ color: "#2B6394" }}>I nostri dottori</h2>
          <div className='row justify-content-center gap-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 mb-5 px-sm-3 mx-0'>
             <HomePageCard />
          </div>
      </section>        
  );
};

export default TopDocs;