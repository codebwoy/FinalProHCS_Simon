import "./Contact.css";
export default function Contact() {
  return (
    <div className="contact-frame">
      <div className="contact-content">
        <h2>Contact Us</h2>

        <div className="contact-details">
          <p>
            <strong>Name:</strong> Simon Boakye
          </p>
          <p>
            <strong>Address:</strong> Hamburg Coding School Gasstrasse 4, 22761
            Hamburg
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto: hello@hamburgcodingschool.com">
              hello@hamburgcodingschool.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong> +4915219338756/+49 40 22863615
          </p>
        </div>

        <div className="project-description">
          <p>
            The goal of my project, part of the curriculum of the Full-Stack Web
            Development program at Hamburg Coding School, is to transfer the
            main idea from my last project "The Travel Blog," initially created
            with pure JavaScript, HTML, and CSS, into a React App. Throughout
            this project, I focus on "thinking of components as building
            blocks," embracing one of the many great aspects of React.
          </p>
        </div>
      </div>
    </div>
  );
}
