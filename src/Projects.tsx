import React from 'react';

const Projects: React.FC = () => (
  <section className="projects-section">
    <h2>My Projects</h2>
    <div className="project-gallery">
      <div className="project-item">
        <img src="/guesso.png" alt="Project Guesso" className="project-image" />
        <h3>Guesso</h3>
        <p>A creative project.</p>
      </div>
      <div className="project-item">
        <img src="/guesso2.png" alt="Project Guesso 2" className="project-image" />
        <h3>Guesso </h3>
        <p>firtst version of the project, demonstrating advanced design and development techniques.</p>
      </div>
    </div>
  </section>
);

export default Projects; 