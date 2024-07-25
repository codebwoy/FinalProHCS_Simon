import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Map.css";

export default function Map({ highlightedCityId }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(13.3888); // Default longitude for Berlin
  const [lat] = useState(52.517); // Default latitude for Berlin
  const [zoom] = useState(4); // Zoom level to encompass all cities
  const [API_KEY] = useState(import.meta.env.VITE_TILES_API_KEY);

  const cities = [
    {
      id: 1,
      name: "Barcelona",
      lng: 2.1774,
      lat: 41.3828,
      title: "Barcelona: A Tapestry of Art and Architecture",
      date: "2024-04-01",
      authorName: "Janny Doe",
      authorImage: "/portra.jpg",
    },
    {
      id: 2,
      name: "Copenhagen",
      lng: 12.57,
      lat: 55.6867,
      title: "The Enchanted Canals of Copenhagen",
      date: "2024-05-08",
      authorName: "Jane Smith",
      authorImage: "/blonde.jpg",
    },
    {
      id: 3,
      name: "Berlin",
      lng: 13.3888,
      lat: 52.517,
      title: "Berlin: Echoes of History and Modern Marvels",
      date: "2024-03-02",
      authorName: "Christian Schwartz",
      authorImage: "/mann.jpg",
    },
    {
      id: 4,
      name: "Paris",
      lng: 2.3483,
      lat: 48.8534,
      title: "Paris: The Timeless Romance",
      date: "2024-06-09",
      authorName: "Bob Brown",
      authorImage: "/john.jpg",
    },
    {
      id: 5,
      name: "Rome",
      lng: 12.4829,
      lat: 41.8933,
      title: "Rome: The Eternal City of Legends",
      date: "2024-01-01",
      authorName: "Charlie Davis",
      authorImage: "/retro.jpg",
    },
    {
      id: 6,
      name: "Vienna",
      lng: 16.3725,
      lat: 48.2083,
      title: "Vienna: A Symphony of Elegance and Culture",
      date: "2024-02-05",
      authorName: "Eve White",
      authorImage: "/deagreez.jpg",
    },
  ];

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    cities.forEach((city) => {
      const popupContent = document.createElement("div");
      popupContent.className = "info-window";

      const title = document.createElement("h2");
      title.textContent = city.title;
      popupContent.appendChild(title);

      const date = document.createElement("p");
      date.textContent = `Visiting Date: ${city.date}`;
      popupContent.appendChild(date);

      const authorDiv = document.createElement("div");
      authorDiv.className = "author";
      const authorImage = document.createElement("img");
      authorImage.src = city.authorImage;
      authorImage.alt = city.authorName;
      authorImage.className = "author-image";
      authorDiv.appendChild(authorImage);
      const authorName = document.createElement("p");
      authorName.textContent = city.authorName;
      authorDiv.appendChild(authorName);
      popupContent.appendChild(authorDiv);

      const link = document.createElement("a");
      link.href = `/BlogPostDetail/${city.id}`;
      link.className = "detail-link";
      link.textContent = "Read More";
      popupContent.appendChild(link);

      const popup = new maplibregl.Popup({ closeOnClick: true }).setDOMContent(
        popupContent
      );

      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([city.lng, city.lat])
        .setPopup(popup) // sets the popup on the marker
        .addTo(map.current);
    });
  }, [API_KEY, lng, lat, zoom, cities]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
