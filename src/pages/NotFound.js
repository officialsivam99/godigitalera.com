import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section style={{padding:"80px 0"}}>
      <div className="container text-center">
        <h1 className="display-6">404</h1>
        <p className="mb-3">This page flew off with our ad spend 🔍</p>
        <Link to="/" className="btn btn-outline-primary">Go Home</Link>
      </div>
    </section>
  );
}
