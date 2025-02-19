import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DiconoDiNoi() {

    const reviews = [
        { id: 1, text: "Ottimo medico, la mia esperienza è stata molto positiva consigliato!", rating: 5, author: "Luca" },
        { id: 2, text: "Sono molto soddisfatta della visita, professionale", rating: 4, author: "Maria" },
        { id: 3, text: "Ottimo dottore, mi sento molto meglio dopo i suoi suggerimenti!", rating: 3.5, author: "Giovanni" },
        { id: 4, text: "Ho perso già 10kg da quando ho iniziato la dieta del medico.", rating: 5, author: "Elena" },
        { id: 5, text: "Esperienza positiva, ritornerò dal medico per controlli futuri.", rating: 4.5, author: "Marco" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        return (
            <div className="rstars text-warning mb-3">
                {"★".repeat(fullStars)}
                {halfStar && "★"}
                {"☆".repeat(5 - Math.ceil(rating))}
            </div>
        );
    };

    return (
        <div className="slider-wrapper shadow-lg p-3 mb-5 bg-body-tertiary rounded" >
            
            <div className='d-flex flex-column align-items-center text-center mb-3' >
                <i className="quote-icon fa-sharp-duotone fa-solid fa-quote-left"></i>
                <h3>Dicono di noi</h3>      
                
            </div>

            <div className="my-5 " style={{ width: "80%", margin: "auto", padding: "20px" }}>
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="rCard ">
                                <div className="card-body">
                                    <div className="stars-container">{renderStars(review.rating)}</div>
                                    <p className="rcard-text">"{review.text}"</p>
                                    <p className="author"><strong>{review.author}</strong></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default DiconoDiNoi;