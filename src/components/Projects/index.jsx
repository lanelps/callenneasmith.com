import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { useApp } from "~hooks";

import { FilterBar, Project } from "~components";
import { GRID_PADDING_REM } from "~components/Common/Grid";

const AllProjects = styled.section`
  position: relative;
  width: 100%;
  padding: 0 ${GRID_PADDING_REM}rem;
`;

const Projects = ({ projects, tags }) => {
  const { setAllProjects, activeFilters } = useApp();

  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeFilters.length > 0) {
      const copyProjects = projects?.filter((project) =>
        project?.tags?.some((tag) => activeFilters?.includes(tag?.name))
      );

      setFilteredProjects(copyProjects);
      setAllProjects(copyProjects);
    } else {
      setFilteredProjects(projects);
      setAllProjects(projects);
    }
  }, [activeFilters]);

  return (
    <section>
      <FilterBar tags={tags} />

      <AllProjects className="b1">
        <ul>
          {filteredProjects.map((project) => (
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
