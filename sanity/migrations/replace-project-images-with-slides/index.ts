import { defineMigration, at, setIfMissing, unset } from "sanity/migrate";

const from = "images";
const to = "slides";

export default defineMigration({
  title: "Replace project images with slides",
  documentTypes: ["project"],

  migrate: {
    document(doc, context) {
      return [at(to, setIfMissing(doc[from])), at(from, unset())];
    }
  }
});
