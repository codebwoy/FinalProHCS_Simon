import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

export default function Map({ highlightedCity }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState(import.meta.env.VITE_TILES_API_KEY);

  useEffect(() => {
    if (map.current) return; // This  condition stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [highlightedCity.lng, highlightedCity.lat],
      zoom: 10,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    const popupContent = document.createElement("div");
    popupContent.className = "info-window";

    const title = document.createElement("h2");
    title.textContent = highlightedCity.title;
    popupContent.appendChild(title);

    const date = document.createElement("p");
    date.textContent = `Visiting Date: ${highlightedCity.date}`;
    popupContent.appendChild(date);

    const authorDiv = document.createElement("div");
    authorDiv.className = "author";
    const authorImage = document.createElement("img");
    authorImage.src = highlightedCity.authorImage;
    authorImage.alt = highlightedCity.authorName;
    authorImage.className = "author-image";
    authorDiv.appendChild(authorImage);
    const authorName = document.createElement("p");
    authorName.textContent = highlightedCity.authorName;
    authorDiv.appendChild(authorName);
    popupContent.appendChild(authorDiv);

    const popup = new maplibregl.Popup({ closeOnClick: true }).setDOMContent(
      popupContent
    );

    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([highlightedCity.lng, highlightedCity.lat])
      .setPopup(popup) // sets the popup on the marker
      .addTo(map.current);
  }, [API_KEY, highlightedCity]);

  return <div ref={mapContainer} className="map" />;
}
