import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { Table } from "https://deno.land/x/cliffy@v1.0.0-rc.4/table/mod.ts";

import * as reg from "./reg.ts";

export const ListCommand = new Command()
  .action(async () => {
    const allImages = await reg.ListImagesAsync();
    
    const tagsLoader = allImages.map(async(image) => {
      const tags = await reg.GetAllTagsAsync(image);

      const tagToShow = tags.slice(0,3);
      const nTagsNotShown = tags.length - 3;
      if(nTagsNotShown >= 1) {
        tagToShow.push(`+${nTagsNotShown}`);
      }

      const tagsStr = tagToShow.join(",");
      return [ image, tagsStr ];
    });
    
    const allWithTags = await Promise.all(tagsLoader);
    const table = Table.from(allWithTags);
    table.render();
  });

// Maybe later
// export const DeleteCommand = new Command()
//   .option("-i, --image <image>", "")
//   .option("-t, --tag <tag>", "")
//   .action(async({ image, tag }) => {
//     console.log(`${image}:${tag}`);

//     const digets = await reg.GetTagDigest(image,tag);
//     console.log(digets);
//   });
