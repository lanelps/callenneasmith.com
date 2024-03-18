export default (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Projects")
        .child(S.documentTypeList("project"))
        .icon(() => "👾"),

      //

      S.listItem()
        .title("Clients")
        .child(S.documentTypeList("client"))
        .icon(() => "👨‍👩‍👧‍👦"),

      //

      S.listItem()
        .title("Tags")
        .child(S.documentTypeList("tag"))
        .icon(() => "🏷️"),

      //

      S.divider(),

      //

      S.listItem()
        .title("Globals")
        .schemaType("settings")
        .child(
          S.editor()
            .title("Settings")
            .schemaType("settings")
            .documentId("settings")
        )
        .icon(() => "🌏")
    ]);
