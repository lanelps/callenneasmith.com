import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title(`Content`)
    .items([
      S.listItem()
        .title(`Projects`)
        .child(S.documentTypeList(`project`))
        .icon(() => <span style={{ fontSize: 30 }}>👾</span>),

      //

      S.listItem()
        .title(`Clients`)
        .child(S.documentTypeList(`client`))
        .icon(() => <span style={{ fontSize: 30 }}>👨‍👩‍👧‍👦</span>),

      //

      S.listItem()
        .title(`Tags`)
        .child(S.documentTypeList(`tag`))
        .icon(() => <span style={{ fontSize: 30 }}>🏷</span>),

      //

      S.listItem()
        .title(`Colours`)
        .child(S.documentTypeList(`colour`))
        .icon(() => <span style={{ fontSize: 30 }}>🎨</span>),

      //

      S.divider(),

      //

      S.listItem()
        .title(`Globals`)
        .schemaType(`settings`)
        .child(
          S.editor()
            .title(`Settings`)
            .schemaType(`settings`)
            .documentId(`settings`)
        )
        .icon(() => <span style={{ fontSize: 30 }}>🌏</span>)
    ]);
