// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// documents
import project from "./documents/project";
import client from "./documents/client";
import tag from "./documents/tag";
import colour from "./documents/colour";
import settings from "./documents/settings";
// objects
import altImage from "./objects/altImage";
import link from "./objects/link";
import blockContent from "./objects/blockContent";
import hoverImage from "./objects/hoverImage";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: `default`,
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */

    // documents
    project,
    client,
    tag,
    colour,
    settings,

    // objects
    altImage,
    link,
    blockContent,
    hoverImage
  ])
});
