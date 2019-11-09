import postcss from "postcss";
import PurgeCSS, { defaultOptions, mergeExtractorSelectors } from "purgecss";

import { RawContent, UserDefinedOptions } from "./types";

type PurgeCSSPostCSSOptions = Omit<UserDefinedOptions, "css">;

const purgeCSSPlugin = postcss.plugin("postcss-plugin-purgecss", function(
  opts: PurgeCSSPostCSSOptions
) {
  return async function(root, result) {
    const purgeCSS = new PurgeCSS();
    const options = {
      ...defaultOptions,
      ...opts
    };
    purgeCSS.options = options;

    const { content, extractors } = options;

    const fileFormatContents = content.filter(
      o => typeof o === "string"
    ) as string[];
    const rawFormatContents = content.filter(
      o => typeof o === "object"
    ) as RawContent[];

    const cssFileSelectors = await purgeCSS.extractSelectorsFromFiles(
      fileFormatContents,
      extractors
    );
    const cssRawSelectors = purgeCSS.extractSelectorsFromString(
      rawFormatContents,
      extractors
    );

    const selectors = mergeExtractorSelectors(
      cssFileSelectors,
      cssRawSelectors
    );

    //purge unused selectors
    purgeCSS.walkThroughCSS(root, selectors);

    if (purgeCSS.options.fontFace) purgeCSS.removeUnusedFontFaces();
    if (purgeCSS.options.keyframes) purgeCSS.removeUnusedKeyframes();

    if (purgeCSS.options.rejected && purgeCSS.selectorsRemoved.size > 0) {
      result.messages.push({
        type: "purgecss",
        plugin: "postcss-purgecss",
        text: `purging ${purgeCSS.selectorsRemoved.size} selectors:
        ${Array.from(purgeCSS.selectorsRemoved)
          .map(selector => selector.trim())
          .join("\n  ")}`
      });
      purgeCSS.selectorsRemoved.clear();
    }
  };
});

export default purgeCSSPlugin;
