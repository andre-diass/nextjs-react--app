/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Dynamically import MapContainer, Marker, and TileLayer with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const MapTeste = () => {
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import Leaflet dynamically on the client
      import("leaflet").then((L) => {
        const scale = 12;
        setIcon(
          L.icon({
            iconUrl: "/green_pin_icon.png",
            iconSize: [600 / scale, 498 / scale],
            iconAnchor: [150 / scale, 496 / scale],
          })
        );
      });
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        zoom={15}
        center={[-8.198687, -34.917878]}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomDelta={1}
        touchZoom
        zoomAnimation
        zoomControl
        attributionControl={false}
      >
        <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
        {icon && <Marker position={[-8.198687, -34.917878]} icon={icon} />}
      </MapContainer>
    </div>
  );
};

export default MapTeste;
