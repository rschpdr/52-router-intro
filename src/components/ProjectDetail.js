import React from "react";
import projects from "../data/projects.json";

class ProjectDetail extends React.Component {
  state = {
    name: "",
    year: 0,
    technologies: "",
    description: "",
    picture: "",
  };

  searchProject = () => {
    if (!this.state.name) {
      const foundProject = projects.find((project) => {
        return project.id === this.props.match.params.dinossauro;
      });

      if (foundProject) {
        this.setState({ ...foundProject });
      }
    }
  };

  render() {
    console.log(this.props);
    this.searchProject();
    return (
      <div className="container mt-5">
        <img src={this.state.picture} alt={this.state.name} />
        <h2>{this.state.name}</h2>
        <p>{this.state.year}</p>
        <p>{this.state.technologies}</p>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default ProjectDetail;
