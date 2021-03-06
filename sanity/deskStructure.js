import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title(`Content`)
    .items([
      S.listItem()
        .title(`Projects`)
        .child(S.documentTypeList(`project`))
        .icon(() => <span style={{ fontSize: 30 }}>๐พ</span>),

      //

      S.listItem()
        .title(`Clients`)
        .child(S.documentTypeList(`client`))
        .icon(() => <span style={{ fontSize: 30 }}>๐จโ๐ฉโ๐งโ๐ฆ</span>),

      //

      S.listItem()
        .title(`Tags`)
        .child(S.documentTypeList(`tag`))
        .icon(() => <span style={{ fontSize: 30 }}>๐ท</span>),

      //

      S.listItem()
        .title(`Colours`)
        .child(S.documentTypeList(`colour`))
        .icon(() => <span style={{ fontSize: 30 }}>๐จ</span>),

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
        .icon(() => <span style={{ fontSize: 30 }}>๐</span>)
    ]);
