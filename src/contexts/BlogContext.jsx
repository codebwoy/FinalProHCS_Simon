import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context for the blog data
export const BlogContext = createContext();

// Define the BlogProvider component to manage and provide blog data
export const BlogProvider = ({ children }) => {
  // Initialize the state with a list of blog posts
  const [blogs] = useState([
    {
      id: 1,
      title: "Copenhagen enchanted Canals",
      visitingDate: "2024-05-08",
      author: { name: "Jane Smith", image: "/blonde.jpg" },
      image: "/copenhagen.jpg",
      text: "Copenhagen: Tivoli Gardens - Located in the heart of Copenhagen, Tivoli Gardens is one of the world's oldest amusement parks, offering beautiful gardens, thrilling rides, and vibrant entertainment options. The park transforms with the seasons, hosting magical Christmas markets in winter and lively festivals in summer.",
      location: {
        city: "Copenhagen",
        country: "Denmark",
        lat: 55.6761,
        lng: 12.5683,
      },
    },
    {
      id: 2,
      title: "Vienna: A Symphony of Elegance ",
      visitingDate: "2024-02-05",
      author: { name: "Eve White", image: "/deagreez.jpg" },
      image: "/vienna.jpg",
      text: "Vienna: Schönbrunn Palace - Once the summer residence of the Habsburg monarchs, Schönbrunn Palace is a magnificent baroque complex with beautiful gardens. Visitors can explore the lavishly decorated rooms, the Gloriette, and the world's oldest zoo located on the palace grounds.",
      location: {
        city: "Vienna",
        country: "Austria",
        lat: 48.2082,
        lng: 16.3738,
      },
    },
    {
      id: 3,
      title: "Paris: The Timeless Romance",
      visitingDate: "2024-06-09",
      author: { name: "Bob Brown", image: "/john.jpg" },
      image: "/paris.jpg",
      text: "Paris: Eiffel Tower - An iconic symbol of Paris, the Eiffel Tower is a must-see for any visitor. Offering breathtaking views of the city from its observation decks, the tower is a marvel of engineering and a centerpiece of French culture, especially stunning when illuminated at night.",
      location: {
        city: "Paris",
        country: "France",
        lat: 48.8566,
        lng: 2.3522,
      },
    },
    {
      id: 4,
      title: "Berlin: Echoes of History",
      visitingDate: "2024-03-02",
      author: { name: "Christian Schwartz", image: "/mann.jpg" },
      image: "/germany.jpg",
      text: "Berlin: Brandenburg Gate - A symbol of Germany's reunification, the Brandenburg Gate stands as a historic monument and a popular tourist attraction. This neoclassical gateway, located in the heart of Berlin, offers visitors a glimpse into the city's turbulent history and its role in shaping modern Europe.",
      location: {
        city: "Berlin",
        country: "Germany",
        lat: 52.52,
        lng: 13.405,
      },
    },
    {
      id: 5,
      title: "Barcelona: A Tapestry Art",
      visitingDate: "2024-04-01",
      author: { name: "Janny Doe", image: "/portra.jpg" },
      image: "/barcelona.jpg",
      text: "Barcelona: Sagrada Família - Antoni Gaudí's masterpiece, the Sagrada Família, is an extraordinary basilica that has been under construction since 1882. Known for its intricate facades and stunning interior, this UNESCO World Heritage Site is a testament to Gaudí's unique architectural vision.",
      location: {
        city: "Barcelona",
        country: "Spain",
        lat: 41.3851,
        lng: 2.1734,
      },
    },
    {
      id: 6,
      title: "Rome:Eternal City of Legends",
      visitingDate: "2024-01-01",
      author: { name: "Charlie Davis", image: "/retro.jpg" },
      image: "/rome.jpg",
      text: "Rome: Colosseum - The Colosseum is a symbol of ancient Rome's grandeur and a testament to its engineering prowess. This colossal amphitheater, where gladiators once fought, offers visitors a fascinating glimpse into the history of the Roman Empire and its entertainment culture.",
      location: {
        city: "Rome",
        country: "Italy",
        lat: 41.9028,
        lng: 12.4964,
      },
    },
  ]);

  // Provide the blogs state to child components
  return (
    <BlogContext.Provider value={{ blogs }}>{children}</BlogContext.Provider>
  );
};
