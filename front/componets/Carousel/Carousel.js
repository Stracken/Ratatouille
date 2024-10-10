// Carousel.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import bananeImage from "@/public/banane.jpg";
import saumonImage from "@/public/saumon.jpg";
import carotteImage from "@/public/carotte2.jpg";
import sugarProductsImage from "@/public/sugarProducts.jpg";
import laitImage from "@/public/lait.jpg";
import bleImage from "@/public/ble.jpg";
import steackImage from "@/public/steack.jpg";
import Link from "next/link";

const Carousel = ({ onCategorySelect }) => {
  const categoriesData = {
    fruits: { title: "Fruits", image: bananeImage },
    poissons: { title: "Poissons", image: saumonImage },
    legumes: { title: "Légumes", image: carotteImage },
    produits_sucres: { title: "Produits Sucrés", image: sugarProductsImage },
    produits_laitiers: { title: "Produits Laitiers", image: laitImage },
    cereales: { title: "Céréales", image: bleImage },
    viandes: { title: "Viandes", image: steackImage },
  };

  const categories = Object.entries(categoriesData).map(([key, value]) => ({
    id: key,
    title: value.title,
    
    ...value,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const visibleItems = 4;
  const itemWidth = 420;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, categories.length - visibleItems)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * (itemWidth + 110),
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div style={styles.carouselContainer}>
      <button
        style={{ ...styles.carouselButton, left: 0 }}
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        {"<"}
      </button>
      <div style={styles.carouselWrapper} ref={carouselRef}>
        {categories.map((item) => (
          <Link href={`/${item.id}`} key={item.id}>
          
            <div  style={styles.carouselItem}>
              <div style={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={160}
                  height={160}
                  style={styles.carouselImage}
                />
              </div>
              <p style={styles.carouselText}>{item.title}</p>
            </div>
            </Link>
        ))}
      </div>
      <button
        style={{ ...styles.carouselButton, right: 0 }}
        onClick={nextSlide}
        disabled={currentIndex >= categories.length - visibleItems}
      >
        {">"}
      </button>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    overflow: "hidden",
  },
  carouselWrapper: {
    display: "flex",
    overflowX: "auto",
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  carouselItem: {
    flex: "0 0 180px",
    marginRight: "20px",
    textAlign: "center",
    cursor: "pointer",
  },
  imageContainer: {
    width: "400px",
    height: "300px",
    margin: "0 auto",
    borderRadius: "8px",
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  carouselText: {
    marginTop: "10px",
    fontWeight: "bold",
  },
  carouselButton: {
    background: "rgba(0, 0, 0, 0.8)",
    color: "white",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    padding: "10px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  },
};

export default Carousel;
