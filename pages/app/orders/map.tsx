/* eslint-disable @next/next/no-img-element */
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { icon, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Ref, useEffect, useState } from "react";

const SCALE = 12;

const MapTeste = () => {
  const [map, setMap] = useState<Map | null>(null);

  const MyComp = () => {
    const map = useMap();
    useEffect(() => {
      map.scrollWheelZoom.disable();
      map.on("click", () => map.scrollWheelZoom.enable());
      map.on("mouseout", () => map.scrollWheelZoom.disable());
    }, [map]);

    return null; // Ensure this component returns something valid
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        ref={setMap as Ref<Map>}
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
        <Marker
          position={[-8.198687, -34.917878]}
          icon={icon({
            iconUrl: "/green_pin_icon.png",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.190539, -34.919619]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.18037, -34.918117]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.165046, -34.914021]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.151115, -34.90783]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.121753, -34.896028]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.099179, -34.884227]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.080219, -34.891753]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.066151, -34.901103]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.134429, -34.900791]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />
        <Marker
          position={[-8.110857, -34.88935]}
          icon={icon({
            iconUrl: "/green_pin_icon.png ",
            iconSize: [600 / SCALE, 498 / SCALE],
            iconAnchor: [150 / SCALE, 496 / SCALE],
          })}
        />

        <MyComp />
      </MapContainer>
    </div>
  );
};

export default MapTeste;
