import React, { useState, useEffect } from "react";
import { FilterBar, Project, Grid } from "~components";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const AllProjects = styled.section`
  width: 100%;
  position: relative;
`;

const FeaturedProjects = styled.section`
  width: 100%;
  position: relative;
`;

const ProjectsTitle = styled.div`
  font-size: 10px;
  line-height: 110%;
  border: 0.5px solid #000000;
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
              colour {
                name
                value {
                  hex
                }
              }
            }
            description
            links {
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

  const [activeFilters, setActiveFilters] = useState([]);
  const [projects, setProjects] = useState(allSanityProject.edges);

  // useEffect(() => {
  //   const copyProjects = [...projects];
  //   copyProjects.filter((project) => project.tags.some(tag));
  // }, [activeFilters]);

  return (
    <div>
      <FilterBar
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <FeaturedProjects>
        {projects.map(
          ({ node: project }) =>
            project.isFeatured && (
              <Project project={project} key={`${projects._id}-active`} />
            )
        )}
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
        {projects.map(({ node: project }) => (
          <Project project={project} key={projects._id} />
        ))}
      </AllProjects>
    </div>
  );
};

export default Projects;
