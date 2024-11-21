import PropTypes from 'prop-types';
import BMGFilters from '../BMGFilters/BMGFilters';
import OtherFilters from '../OtherFilters/OtherFilters';
import { useRef, useEffect } from 'react';
import './Filters.css';
import { throttle } from 'lodash';
import PinnableButton from '../PinnableButton/PinnableButton';

const Filters = ({ enableAnimations }) => {
const filtersRef = useRef(null);
const showCarsBtnRef = useRef(null);
const showCarsContainerRef = useRef(null);
const throttledHandleScroll = useRef(null);

useEffect(() => {
    throttledHandleScroll.current = throttle(() => {
        if (filtersRef.current && showCarsContainerRef.current) {
            const rect = filtersRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const bottomEdge = windowHeight - rect.top; // Расчет расстояния от верхней части фильтров до нижней части окна
            const opacity = Math.max(0, Math.min(1, (bottomEdge - 300) / 350));

            const endOfFilter = windowHeight >= rect.bottom  ? true : false;

            showCarsBtnRef.current.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
            showCarsContainerRef.current.style.opacity = opacity;
            showCarsBtnRef.current.style.opacity = opacity;

            if (endOfFilter) {
                showCarsContainerRef.current.classList.add('pinned');
            } else {
                showCarsContainerRef.current.classList.remove('pinned');
            }
        }
    }, 60);

    return () => {
        throttledHandleScroll.current.cancel();
    };
}, []);

useEffect(() => {
    const handleScroll = () => {
        if (throttledHandleScroll.current) {
            throttledHandleScroll.current();
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

console.log('Filters_Rendered');

    return (
        <div className='filtersContainer' ref={filtersRef}>
            <BMGFilters enableAnimations={enableAnimations} />
            <OtherFilters />
            <PinnableButton showCarsContainerRef={showCarsContainerRef} showCarsBtnRef={showCarsBtnRef} />
        </div>
    );
};

export default Filters;

Filters.propTypes = {
    enableAnimations: PropTypes.bool.isRequired,
};