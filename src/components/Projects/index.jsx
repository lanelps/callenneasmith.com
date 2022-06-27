import React, { useState, useEffect } from "react";
import { FilterBar, Project, Grid } from "~components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const FeaturedProjects = styled.section`
  position: relative;
  width: 100%;
`;

const ProjectsTitle = styled.div`
  position: relative;
  border-top: 0.5px solid var(--color-rich-black);
`;

const AllProjects = styled.section`
  position: relative;
  width: 100%;
  border-bottom: 0.5px solid var(--color-rich-black);
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

      <FeaturedProjects className="b1">
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
              padding-top: 2rem;
              padding-bottom: 0.625rem;
              text-transform: uppercase;
            `}
            className="caption"
          >
            Project Archive (Newest to Oldest)
          </h2>
        </Grid>
      </ProjectsTitle>

      <AllProjects className="b1">
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
