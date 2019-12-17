import React from 'react';
import Car from './Car';

export default function MainCars({cars}) {
    return (
        <>
            {cars.map(item => <Car key={item.id} {...item} />)}
        </>
    );
}