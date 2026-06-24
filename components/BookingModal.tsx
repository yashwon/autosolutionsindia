"use client";

import { useState } from "react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      name,
      email,
      phone,
      business_type: businessType,
      message,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Unable to save your booking request.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setBusinessType("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save your booking request."
      );
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10001,
        background: "rgba(0, 0, 0, 0.88)",
        color: "#fff",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        padding: "24px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
      data-lenis-prevent
    >
      <div
        style={{
          width: "min(860px, 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(12, 12, 12, 0.96)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          padding: "32px",
          position: "relative",
          marginTop: "auto",
          marginBottom: "auto",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            border: "none",
            background: "transparent",
            color: "#fff",
            fontSize: "1.25rem",
            cursor: "pointer",
          }}
          aria-label="Close booking form"
        >
          ×
        </button>

        <h2 style={{ margin: 0, marginBottom: "20px", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.1 }}>
          Join the community
        </h2>
        <p style={{ marginTop: "8px", marginBottom: "24px", color: "rgba(255,255,255,0.72)", fontSize: "0.98rem" }}>
          Share your details below to join our community.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: "16px" }}>
            <label style={labelStyle}>
              Full name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                style={inputStyle}
                placeholder="Your name"
              />
            </label>

            <label style={labelStyle}>
              Email address
              <input
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={inputStyle}
                placeholder="Email address"
                type="email"
              />
            </label>

            <label style={labelStyle}>
              Phone number
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                style={inputStyle}
                placeholder="Phone number"
              />
            </label>

            <label style={labelStyle}>
              Business type (Optional)
              <input
                value={businessType}
                onChange={(event) => setBusinessType(event.target.value)}
                style={inputStyle}
                placeholder="E.g. agency, clinic, store"
              />
            </label>

            <label style={labelStyle}>
              Message (Optional)
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
                placeholder="Tell us about your goals"
              />
            </label>

            {status === "error" && (
              <div style={{ color: "#ff8a80", fontSize: "0.96rem" }}>{errorMessage}</div>
            )}

            {status === "success" && (
              <div style={{ color: "#7ef1a3", fontSize: "0.96rem" }}>
                Welcome to the community! We will be in touch soon.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                ...buttonStyle,
                opacity: status === "submitting" ? 0.72 : 1,
                cursor: status === "submitting" ? "not-allowed" : "pointer",
              }}
            >
              {status === "submitting" ? "Joining..." : "Join the community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: "10px",
  color: "#eee",
  fontSize: "0.95rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "44px",
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: "0.01em",
  transition: "background 0.2s ease, color 0.2s ease",
};
