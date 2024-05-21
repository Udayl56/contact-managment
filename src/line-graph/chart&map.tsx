
import React from 'react';
import { LineGraph } from './graph';
import Map from '../map/map';



export const ChartAndMap: React.FC = () => (
    <div className='w-full p-1'>
        <h1 className='text-center'>Cases Fluctuations Line Graph</h1>
        <div className='p-1'>
            <LineGraph />
        </div>


        <div className='p-1 my-8'>
            <h1 className='text-center'> Leaflet Map</h1>
            <Map />
        </div>


    </div>
);


