import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({ markerLocations }) {
  // زمانی که چیزی وجود نداشت این موقعیتو نمایش بده،اگر یک هتل انتخاب شود موقعیتش ست مپ میشود و اگر بک زده شود مرورگر موقعیت آخرین بازدید را روی صفحه همه هتل ها نمایش میدهد
  const [mapCenter, setMapCenter] = useState([35.7, 51.4]);
  const [lat, lng] = useUrlLocation();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  // آخرین جایی که کاربر ویزیت کرده موقعیت مکانیش ذخیره شود برای نمایش دادن روی نقشه :
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  // زمانیکه کاربر لوکیشن خودشو انتخاب کنه سنتر نقشه تغییر میکند
  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="relative flex-1 -z-0">
      <MapContainer
        className="h-full"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button
          onClick={getPosition}
          className="absolute bottom-2 md:bottom-4 left-2 md:left-4 py-1 px-2 rounded-lg bg-blue-700 text-white z-1000 text-xs sm:text-base"
        >
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    // click: (e) => console.log(e),
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
