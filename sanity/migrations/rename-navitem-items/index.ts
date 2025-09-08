import { defineMigration, at, set } from "sanity/migrate";

const oldType = "item";
const newType = "navItemItem";

export default defineMigration({
  title: "Rename NavItem items",
  documentTypes: ["settings"],

  migrate: {
    object(object, path, context) {
      if (object._type === oldType) {
        return at("_type", set(newType));
      }
    }
  }
});
