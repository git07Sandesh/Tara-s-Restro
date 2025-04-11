import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import Navbar from '../components/Navbar'
import { CircleFadingArrowUp } from 'lucide-react'
import Footer from '../components/Footer'

const Dashboard = () => {
  const {logout, userData} = useAuthStore()
  
  return (
    <div>
      {userData && (
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
          <button onClick={logout} className="secondary-button">
            LogOut <CircleFadingArrowUp />{" "}
          </button>
        </div>
        <div className="home-image-section">
        </div>
      </div>
    <Footer />
        </>
       
      )}
    </div>
  )
}

export default Dashboard