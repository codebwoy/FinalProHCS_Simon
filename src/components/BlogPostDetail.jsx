import { useContext, useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import "./BlogPostDetail.css";

export default function BlogPostDetailWithMap() {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);
  const blog = blogs.find((b) => b.id === parseInt(id, 10));

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState(import.meta.env.VITE_TILES_API_KEY);

  useEffect(() => {
    if (!blog) return;

    const { lng, lat } = blog.location;

    if (map.current) {
      map.current.setCenter([lng, lat]);
      map.current.setZoom(10);
      return;
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: 10,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    const popupContent = document.createElement("div");
    popupContent.className = "info-window";

    const title = document.createElement("h2");
    title.textContent = blog.title;
    popupContent.appendChild(title);

    const date = document.createElement("p");
    date.textContent = `Visiting Date: ${new Date(
      blog.visitingDate
    ).toLocaleDateString()}`;
    popupContent.appendChild(date);

    const authorDiv = document.createElement("div");
    authorDiv.className = "author";
    const authorImage = document.createElement("img");
    authorImage.src = blog.author.image;
    authorImage.alt = blog.author.name;
    authorImage.className = "author-image";
    authorDiv.appendChild(authorImage);
    const authorName = document.createElement("p");
    authorName.textContent = blog.author.name;
    authorDiv.appendChild(authorName);
    popupContent.appendChild(authorDiv);

    const popup = new maplibregl.Popup({ closeOnClick: true }).setDOMContent(
      popupContent
    );

    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([lng, lat])
      .setPopup(popup) // sets the popup on the marker
      .addTo(map.current);
  }, [API_KEY, blog]);

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div className="container">
      <div className="blog-post-detail-container">
        <Link to="/Dashboard" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="blog-post-detail">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-header">
            <h4>{blog.title}</h4>
            <p>{new Date(blog.visitingDate).toLocaleDateString()}</p>
          </div>
          <div className="author-detail">
            <img
              src={blog.author.image}
              alt={blog.author.name}
              className="author-image"
            />
            <p>{blog.author.name}</p>
          </div>
          <p className="blog-text">{blog.text}</p>
          <div className="location">
            <p>
              {blog.location.city}, {blog.location.country}
            </p>
          </div>
        </div>
      </div>
      <div className="map-container">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
}
