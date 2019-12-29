import React from 'react';
import Car from '../car';

export default function ListCars({cars}) {
    return (
        <>
            {cars.map(item => <Car key={item.id} {...item} />)}
        </>
    );
}