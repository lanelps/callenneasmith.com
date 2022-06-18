import React, { useState, useEffect } from "react";
import { FilterBar, Project, Grid } from "~components";
import { useStaticQuery, graphql } from "gatsby";
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

const Projects = () => {
  const { allSanityProject } = useStaticQuery(graphql`
    query {
      allSanityProject(sort: { fields: started, order: DESC }) {
        edges {
          node {
            _id
            name
            client {
              name
            }
            isFeatured
            isOngoing
            ended(formatString: "y")
            started(formatString: "y")
            tags {
              _id
              name
              colour {
                name
                value {
                  hex
                }
              }
            }
            description
            links {
              _key
              label
              url
            }
            images {
              _key
              altText
              asset {
                gatsbyImageData(
                  width: 720
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  `);

  const allProjects = allSanityProject.edges.map(({ node }) => node);

  const [activeFilters, setActiveFilters] = useState([]);
  const [projects, setProjects] = useState(allProjects);

  useEffect(() => {
    if (activeFilters.length > 0) {
      const copyProjects = allProjects?.filter((project) =>
        project?.tags?.some((tag) => activeFilters?.includes(tag?.name))
      );

      setProjects(copyProjects);
    } else {
      setProjects(allProjects);
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
          {projects.map(
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
        {projects.map((project) => (
          <li key={project._id}>
            <Project project={project} />
          </li>
        ))}
      </AllProjects>
    </section>
  );
};

export default Projects;
