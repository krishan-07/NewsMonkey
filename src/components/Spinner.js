import React from "react";

export default function Spinner () {
  return (
    <div>
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" style={{width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
