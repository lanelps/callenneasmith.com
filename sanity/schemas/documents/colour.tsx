import React from "react";
import styled from "styled-components";

const Color = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ value }) => value};
  border: 1px solid var(--card-shadow-outline-color);
  border-radius: 0.1875rem;

  & + * {
    display: none !important;
  }
`;

export default {
  name: "colour",
  title: "Colour",
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
      name: "value",
      title: "Value",
      type: "color"
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
      value: "value.hex",
      icon: "seoIcon"
    },
    prepare: ({ name, value, icon }) => ({
      title: name,
      subtitle: value,
      media: icon || <Color value={value} />
    })
  }
};
