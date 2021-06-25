import React from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects.json";

class ProjectList extends React.Component {
  state = {
    projects: [...projects],
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          {this.state.projects.map((project) => {
            return (
              <div className="col-4" key={project.id}>
                <div className="card">
                  <img
                    src={project.picture}
                    className="card-img-top img-fluid"
                    alt={project.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.year}</p>
                    <Link
                      to={`/projects/${project.id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProjectList;
