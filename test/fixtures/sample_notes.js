let validNote = {
  filename: "20201114103422 This is a valid note.md",
  permalink: "20201114103422 This is a valid note",
  title: "This is a valid note",
  linksOut: [{
   value: "20201114103411 the link",
   data: {
     alias: "20201114103411 the link",
     permalink: "20201114103411 the link",
     exists: true
   }
  }],
  linksIn: [{
   fromFilename: "20201114103433 Another note.md",
   fromTitle: "Another note",
   alias: "20201114103422 This is a valid note",
   permalink: "20201114103422 This is a valid note",
   context: "This is the context around a link to [[20201114103422 This is a valid note]]. Testing."
  }],
  content: "# This is a valid note\n\nThis is a valid note with one link in it. This is [[20201114103411 the link]].\n",
  tree: {
   type: "root",
   children: [
     {
       type: "heading",
       depth: 1,
       children: [{ type: "text", value: "This is a valid note" }]
     },
     {
       type: "paragraph",
       children: [
         {
           type: "text",
           value: "This is a valid note with one link in it. This is [[20201114103411 the link]]."
         },
         {
           type: "wikiLink",
           value: "20201114103411 the link",
           data: {
             alias: "20201114103411 the link",
             permalink: "20201114103411 the link",
             exists: true
           }
         }
       ]
     }
   ]
  }
};

let validNoteTree = {
  type: "root",
  children: [
    {
      type: "heading",
      depth: 1,
      children: [{ type: "text", value: "This is a valid note" }]
    },
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "This is a valid note with one link in it. This is [[20201114103411 the link]]."
        },
        {
          type: "wikiLink",
          value: "20201114103411 the link",
          data: {
            alias: "20201114103411 the link",
            permalink: "20201114103411 the link",
            exists: true
          }
        }
      ]
    }
  ]
};

exports.validNote = validNote;
exports.validNoteTree = validNoteTree;
