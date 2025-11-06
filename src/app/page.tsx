"use client";

import { useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { DIALECT_MARKERS, LOCATIONS } from "./common/locations";
import { useMapStore } from "./_state/map.store";
import Appbar from "./components/appbar";
import { addMarker, addPlace } from "~/lib/custom-map";
import { geoJson } from "~/lib/geojson";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGNyZWJiaW4iLCJhIjoiY20xMjFtYnc0MHh4ZjJrb2h2NDR5MjF6YyJ9.LOAauCyTV_pfMAYd08pTmg";

export default function Home() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const { map, setMap } = useMapStore();

  const zoom = 10;
  const center = [114.16819296950341, 22.31382741410536];

  const handleMapContainerRef = (node: HTMLDivElement | null) => {
    if (!node || map) return;
    mapContainer.current = node;

    const newMap = new mapboxgl.Map({
      container: node,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center as mapboxgl.LngLatLike,
      zoom: zoom,
    });

    newMap.on("load", () => {
      if (!newMap.getSource("custom-layer")) {
        newMap.addSource("custom-layer", {
          type: "geojson",
          data: geoJson as GeoJSON.FeatureCollection,
        });

        newMap.addLayer({
          id: "custom-layer",
          type: "fill",
          source: "custom-layer",
          paint: {
            "fill-color": ["get", "fill"],
            "fill-opacity": ["get", "fill-opacity"],
          },
        });
      }
    });

    setMap(newMap);
    DIALECT_MARKERS.forEach((marker) => {
      addMarker(marker, newMap);
    });

    LOCATIONS.forEach((location) => {
      addPlace(location, newMap);
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <div className="relative flex h-[100vh] w-[100vw] overflow-hidden">
        <Appbar />
        <div ref={handleMapContainerRef} className="map-container relative" />
        <style jsx>{`
          .map-container {
            height: 100vh;
            width: 100vw;
          }
        `}</style>
      </div>
    </div>
  );
}
