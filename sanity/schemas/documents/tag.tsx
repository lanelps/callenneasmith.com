import React from "react";
import styled from "styled-components";

const Tag = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${({ color }) => color};
  border-radius: 0.1875rem;

  font-size: 24px;

  & + * {
    display: none !important;
  }
`;

export default {
  name: "tag",
  title: "Tag",
  type: "document",
  fieldsets: [
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "colour",
      title: "Colour",
      type: "reference",
      to: [{ type: "colour" }]
    },
    {
      name: "seoIcon",
      title: "Icon",
      type: "altImage",
      fieldset: "seo",
      description: "Icon to show in sanity studio"
    }
  ],
  preview: {
    select: {
      name: "name",
      colourName: "colour.name",
      colourValue: "colour.value",
      icon: "seoIcon"
    },
    prepare: ({ name, colourName, colourValue, icon }) => ({
      title: name,
      subtitle: colourName,
      media: icon || (
        <Tag color={colourValue.hex}>
          <span>🏷</span>
        </Tag>
      )
    })
  }
};
