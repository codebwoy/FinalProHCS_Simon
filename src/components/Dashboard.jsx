import BlogPostPreview from "./BlogPostPreview";
import Map from "./Map";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <div className="dashboard">
          <BlogPostPreview />
        </div>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <Map />
      </div>
    </div>
  );
}
