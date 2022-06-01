import React from "react";
import { FilterBar, Project } from "~components";
import { useStaticQuery, graphql } from "gatsby";

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      allSanityProject {
        nodes {
          name
          _id
          isFeatured
        }
      }
    }
  `);

  return (
    <div>
      <FilterBar />
      <Project />
    </div>
  );
};

export default Projects;
