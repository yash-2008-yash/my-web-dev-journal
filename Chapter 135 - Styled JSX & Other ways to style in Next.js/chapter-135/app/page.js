"use client"

export default function Home() {
  return (
    <div className="card">
      <h1>I am styled with Styled JSX</h1>

      <style jsx>{`
        .card {
          padding: 16px;
          border-radius: 8px;
          background: #111;
        }
        .card:hover {
          background: #222;
        }
      `}</style>

    </div>
  );
}