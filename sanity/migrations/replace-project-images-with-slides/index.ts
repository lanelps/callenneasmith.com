import { defineMigration, at, setIfMissing, unset, set } from "sanity/migrate";

const from = "images";
const to = "slides";

export default defineMigration({
  title: "Transform project tags",
  documentTypes: ["project"],

  migrate: {
    document(doc, context) {
      console.log(`DOC`);
      if (doc.tags) {
        return set(
          doc.tags.map((tag) => ({
            text: tag,
            url: ""
          }))
        );
      }
    }
  }
});
