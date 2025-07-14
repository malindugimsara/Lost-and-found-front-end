// ...existing imports...
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
  width: '400px',
  height: '300px'
};

const center = {
  lat: 6.9271,
  lng: 79.8612
};

function LocationPicker({ onLocationSelect }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDklytDYnuIoUd6riEIqA9HXGxLFyn9USA'
  });
  const [marker, setMarker] = useState(center);

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker}
      zoom={10}
      onClick={handleMapClick}
    >
      <Marker position={marker} />
    </GoogleMap>
  );
}

export default LocationPicker;