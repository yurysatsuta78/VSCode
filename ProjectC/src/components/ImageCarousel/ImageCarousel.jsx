import { useRef, useState } from 'react';
import './ImageCarousel.css';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function ImageCarousel({ images, serverUrl }) {
const windowRef = useRef(null);
const [offset, setOffset] = useState(0);

const WINDOW_WIDTH = 600;

const handleLeftClick = () => {
    setOffset((currentOffset) => {
        const newOffset = currentOffset + WINDOW_WIDTH;

        return Math.min(newOffset, 0);
    });
};

const handleRightClick = () => {
    setOffset((currentOffset) => {
        const newOffset = currentOffset - WINDOW_WIDTH;

        const maxOffset = -(WINDOW_WIDTH * (images.length - 1));
        
        return Math.max(newOffset, maxOffset);
    });
};

    return (
        <div className="main-container">
            <div ref={windowRef} className="window">
                <div 
                    style={{ 
                        width: WINDOW_WIDTH,
                        transform: `translateX(${offset}px)`,
                    }} 
                    className="all-images-container"
                >
                    {
                        images.map((image, index) => (
                            <div key={index} style={{ minWidth: '100%', maxWidth: '100%' }} >
                                <img className="carousel-image" src={`${serverUrl}${image.imageUrl}`} alt={index} ></img>
                            </div>
                        ))
                    }
                </div>
            <button onClick={handleLeftClick} className="carousel-btn left-btn">
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={handleRightClick} className="carousel-btn right-btn">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            </div>
        </div>
    );
}

export default ImageCarousel;

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
          imageUrl: PropTypes.string,
        }),
    ).isRequired,
    serverUrl: PropTypes.string.isRequired,
};