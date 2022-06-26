import React, { useState, useEffect } from "react";
import { FilterBar, Project, Grid } from "~components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const FeaturedProjects = styled.section`
  width: 100%;
  position: relative;
`;

const ProjectsTitle = styled.div`
  font-size: 10px;
  line-height: 110%;
  border: 0.5px solid #000000;
`;

const AllProjects = styled.section`
  width: 100%;
  position: relative;
`;

const Projects = ({ projects }) => {
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
      />

      <FeaturedProjects>
        <ul>
          {allProjects.map(
            (project) =>
              project.isFeatured && (
                <li key={`${project._id}-featured`}>
                  <Project project={project} />
                </li>
              )
          )}
        </ul>
      </FeaturedProjects>

      <ProjectsTitle>
        <Grid>
          <h2
            css={css`
              grid-column: 1 / span 3;
              padding: 14px 0px;
              font-weight: 500;
              text-transform: uppercase;
            `}
          >
            Project Archive (Newest to Oldest)
          </h2>
        </Grid>
      </ProjectsTitle>

      <AllProjects>
        {allProjects.map((project) => (
          <li key={project._id}>
            <Project project={project} />
          </li>
        ))}
      </AllProjects>
    </section>
  );
};

export default Projects;
