import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CircleFadingArrowUp } from 'lucide-react'

const HomePage = () => {
  return (
    <>
    <Navbar />
    {/* TTemporary */}
    <div className="home-banner-container">
        <div className="home-bannerImage-container">
          
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favourite Food Delivered Hot & Fresh
          </h1>
          <p className="primary-text">
            Healthy switcher chefs do all the prep work, like peeding, chopping
            & marinating, so you can cook a fresh food.
          </p>
          <button className="secondary-button">
            Order Now <CircleFadingArrowUp />{" "}
          </button>
        </div>
        <div className="home-image-section">
        </div>
      </div>
    <Footer />
    </>
  )
}

export default HomePage