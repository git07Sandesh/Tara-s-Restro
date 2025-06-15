// THis is a component for the quick menu in the frontend where I want to display recent promotional images that I create. I want to create a model like structure that switches between images and displays them in a carousel format. The images will be fetched from the backend and displayed in a carousel format using a library like Swiper or similar. Help me code it.

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const QuickMenu = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/images');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="quick-menu">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
            >
                {images.map((image) => (
                    <SwiperSlide key={image._id}>
                        <img src={image.url} alt={image.title} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default QuickMenu;

// OK // This component fetches images from the backend and displays them in a carousel format using Swiper.
// Give me a backend code that I can copy and paste to create an API endpoint that serves these images.
// I already have the structure. I just need the codes that can go in my controller and model

// Sure! Below is a simple Express.js backend code that you can use to create an API endpoint for serving images. This includes a model and a controller.
// Assuming you are using Mongoose for MongoDB interactions.
