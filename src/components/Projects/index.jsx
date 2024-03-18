import React, { useState, useEffect } from "react";
import { FilterBar, Project } from "~components";
import styled from "@emotion/styled";

const AllProjects = styled.section`
  position: relative;
  width: 100%;
`;

const Projects = ({ projects, tags }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [allProjects, setAllProjects] = useState(projects);

  useEffect(() => {
    if (activeFilters.length > 0) {
      const copyProjects = projects?.filter((project) =>
        project?.tags?.some((tag) => activeFilters?.includes(tag?.name))
      );

      setAllProjects(copyProjects);
    } else {
      setAllProjects(projects);
    }
  }, [activeFilters]);

  return (
    <section>
      <FilterBar
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        tags={tags}
      />

      <AllProjects className="b1">
        <ul>
          {allProjects.map((project) => (
            <li key={project._id}>
              <Project project={project} />
            </li>
          ))}
        </ul>
      </AllProjects>
    </section>
  );
};

export default Projects;
