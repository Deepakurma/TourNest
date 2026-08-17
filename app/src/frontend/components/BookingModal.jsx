import { useState } from "react";

const BookingModal = ({ tour, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!tour) return null;

  const handleBook = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8000/user/booktour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          tour: tour._id,
        }),
      });

      onClose();

      if (!res.ok) {
        setErrorMsg(res.message || "Booking failed");
        return;
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {errorMsg && <p>{errorMsg}</p>}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h2 className="heading-secondary" style={{ marginBottom: "1rem" }}>
          Book {tour.name}
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-text-muted)",
            marginBottom: "2rem",
          }}
        >
          Select dates and confirm your adventure booking below.
        </p>

        <form onSubmit={handleBook}>
          {/* Pricing Summary */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "1.2rem",
              marginBottom: "1.8rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Price per Person
              </span>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                ${tour.price}
              </h4>
            </div>
            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Total Amount
              </span>
              <h4
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "var(--color-primary-light)",
                }}
              >
                ${tour.price}
              </h4>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn--green"
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Payment..." : `Pay & Book Now`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
