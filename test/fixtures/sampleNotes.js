let validNote = {
  title: "This is a valid note",
   links: [{
     value: "20201114103411 the link",
     data: {
       alias: "20201114103411 the link",
       permalink: "20201114103411 the link",
       exists: true
     }
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

exports.validNote = validNote;
