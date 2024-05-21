// Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCovidCountryData } from './countryData';

import L from 'leaflet';

const Map: React.FC = () => {
    // Fetch COVID-19 country data using a custom hook
    const { data, error, isLoading } = useCovidCountryData();

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;
    // Handle error state
    if (error) return <div>Error fetching data</div>;

    // Define a custom marker icon using Leaflet
    const customIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
            {/* Add OpenStreetMap tile layer */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Map through the country data to create markers */}
            {data.map((country: any) => (
                <Marker
                    key={country.countryInfo._id}
                    position={[country.countryInfo.lat, country.countryInfo.long]}
                    icon={customIcon}
                >
                    <Popup>
                        {/* Popup content with country-specific COVID-19 data */}
                        <div>
                            <h2>{country.country}</h2>
                            <p><strong>Active:</strong> {country.active}</p>
                            <p><strong>Recovered:</strong> {country.recovered}</p>
                            <p><strong>Deaths:</strong> {country.deaths}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
