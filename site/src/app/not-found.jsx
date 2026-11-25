export default function NotFound() {
  return (
    <section className="work-hero">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1 className="case-title">This page is not in the index</h1>
        <p className="case-lede">That page doesn't exist. Head back to my case studies or the home page.</p>
        <div className="hero__ctas" style={{ marginTop: "28px", justifyContent: "flex-start" }}>
          <a className="btn btn--dark" href="/work/">View case studies</a>
          <a className="btn btn--light" href="/">Home</a>
        </div>
      </div>
    </section>
  );
}
