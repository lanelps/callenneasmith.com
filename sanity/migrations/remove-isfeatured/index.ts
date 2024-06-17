import { at, defineMigration, unset } from "sanity/migrate";

export default defineMigration({
  title: "remove-isfeatured",
  documentTypes: ["project"],

  migrate: {
    document(doc, context) {
      return [at("isFeatured", unset())];
    }
  }
});
