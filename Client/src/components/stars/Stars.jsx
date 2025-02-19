function Stars({ vote }) {
    const fullStars = Math.floor(vote);
    const halfStar = vote % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={`full-${i}`} className="fas fa-star" style={{ color: '#4FBE89' }}></i>);
    }
    if (halfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt" style={{ color: '#4FBE89' }}></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={`empty-${i}`} className="far fa-star" style={{ color: 'rgba(23, 164, 138, 0.2)' }}></i>);
    }

    return <span>{stars}</span>;
};

export default Stars;