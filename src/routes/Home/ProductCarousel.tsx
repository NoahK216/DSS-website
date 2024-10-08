/* Noah Klein */

import React, { useState, useEffect, useRef } from 'react';
import Tilt, { ReactParallaxTiltProps } from 'react-parallax-tilt';
import products from './products';

import './ProductCarousel.css';

const ProductCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const interactionRef = useRef<boolean>(false); // To track user interaction

    const goToProduct = (index: number) => {
        setCurrentIndex(index);
        interactionRef.current = true; // Mark as interacted
    };

    const goToNextProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!interactionRef.current) {
                goToNextProduct();
            }
        }, 5000);

        return () => clearTimeout(timer); // Clear timer when component unmounts or index changes
    }, [currentIndex]);

    const getProductPosition = (index: number) => {
        const totalProducts = products.length;
        const offset = (index - currentIndex + totalProducts) % totalProducts;

        switch (offset) {
            case 0:
                return 'center-product'; // Center product
            case 1:
                return 'right-product'; // Right product
            case 2:
                return 'right-out-product'; // Right out of frame
            case totalProducts - 2:
                return 'left-out-product'; // Left out of frame
            case totalProducts - 1:
                return 'left-product'; // Left product
            default:
                return 'hidden-product'; // Hidden products
        }
    };

    const getProductTiltProps = (index: number): ReactParallaxTiltProps => {
        const totalProducts = products.length;
        const offset = (index - currentIndex + totalProducts) % totalProducts;

        const spotlightTiltProps: ReactParallaxTiltProps = {
            tiltMaxAngleX: 10,
            tiltMaxAngleY: 10,
            perspective: 1400,
            transitionSpeed: 3000,
            glareMaxOpacity: 0,
        };

        const offsetTiltProps: ReactParallaxTiltProps = {
            tiltMaxAngleX: 20,
            tiltMaxAngleY: 20,
            perspective: 1400,
            transitionSpeed: 1000,
            glareEnable: false,
        };

        return offset ? offsetTiltProps : spotlightTiltProps;
    };

    return (
        <div className="ProductCarousel">
            <h1>Products</h1>
            <div className="carousel">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className={`product ${getProductPosition(index)}`}
                        onClick={() => goToProduct(index)}
                    >
                        <Tilt {...getProductTiltProps(index)}>
                            <img src={product.imageUrl} alt={product.name} draggable="false" />
                        </Tilt>
                        <p className="name">{product.name}</p>
                        <p className="description">{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
