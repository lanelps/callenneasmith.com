import { at, defineMigration, setIfMissing, unset } from "sanity/migrate";

export default defineMigration({
  title: "Remove project Order",
  documentTypes: ["project"],

  migrate: {
    document(doc, context) {
      return at("order", unset());
    }
  }
});
