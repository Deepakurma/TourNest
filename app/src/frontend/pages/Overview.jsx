import React, { useState, useMemo } from "react";
import TourCard from "../components/TourCard";

const Overview = ({ tours = [], searchVal }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState("default");

  // Compute stats for price slider dynamically
  const maxAvailablePrice = useMemo(() => {
    if (tours.length === 0) return 3000;
    return Math.max(...tours.map((t) => t.price), 1000);
  }, [tours]);

  // Adjust default max price when tours are loaded
  React.useEffect(() => {
    setMaxPrice(maxAvailablePrice);
  }, [maxAvailablePrice]);

  // Main filter and sort pipeline
  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Search query filter
    if (searchVal && searchVal.trim() !== "") {
      const query = searchVal.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.name.toLowerCase().includes(query) ||
          tour.summary.toLowerCase().includes(query) ||
          (tour.startLocation &&
            tour.startLocation.description.toLowerCase().includes(query)),
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      result = result.filter(
        (tour) => tour.difficulty.toLowerCase() === selectedDifficulty,
      );
    }

    // Price filter
    result = result.filter((tour) => tour.price <= maxPrice);

    // Sorting logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [tours, searchVal, selectedDifficulty, maxPrice, sortBy]);

  return (
    <main className="main">
      {/* Premium Hero Banner */}
      <section className="hero-section">
        <h1 className="hero-title">
          Explore Wild Nature &amp;
          <br />
          Adventurous Outdoors
        </h1>
        <p className="hero-text">
          TourNest is a premium booking portal for exciting wilderness treks,
          coastal escapades, and alpine snow expeditions. Live a life filled
          with adventure.
        </p>
        <a href="#catalog" className="btn btn--green">
          Browse Catalog
        </a>
      </section>

      {/* Advanced Catalog Filters */}
      <section id="catalog" style={{ scrollMarginTop: "100px" }}>
        <div className="filter-bar">
          {/* Difficulty Filters */}
          <div className="filter-group">
            <span className="filter-label">Difficulty:</span>
            {["all", "easy", "medium", "difficult"].map((diff) => (
              <button
                key={diff}
                className={`filter-btn ${selectedDifficulty === diff ? "filter-btn--active" : ""}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="filter-group range-slider">
            <span className="filter-label">Max Price:</span>
            <input
              type="range"
              min="200"
              max={maxAvailablePrice}
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span
              style={{
                fontWeight: "700",
                color: "var(--color-primary-light)",
                minWidth: "60px",
              }}
            >
              ${maxPrice}
            </span>
          </div>

          {/* Sort Toggles */}
          <div className="filter-group">
            <span className="filter-label">Sort By:</span>
            <select
              className="filter-btn"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "#111827",
                color: "white",
                border: "1px solid var(--color-border)",
              }}
            >
              <option value="default">Best Match</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Catalog Grid View */}
        {filteredTours.length > 0 ? (
          <div className="card-container">
            {filteredTours.map((tour) => (
              <TourCard key={tour._id || tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "6rem 2rem",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              style={{
                width: "64px",
                height: "64px",
                fill: "var(--color-text-muted)",
                marginBottom: "1.5rem",
              }}
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              No adventures match your criteria
            </h3>
            <p
              style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}
            >
              Try clearing your search query or loosening your price limits!
            </p>
            <button
              onClick={() => {
                setSelectedDifficulty("all");
                setMaxPrice(maxAvailablePrice);
                setSortBy("default");
              }}
              className="btn btn--green btn--small"
              style={{ marginTop: "1.5rem" }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Overview;
