type ExtractorResultDetailed = {
  attributes: {
    names: string[];
    values: string[];
  };
  classes: string[];
  ids: string[];
  tags: string[];
  undetermined: string[];
};
declare const purgecssFromHtml: (content: string) => ExtractorResultDetailed;
export { purgecssFromHtml as default };
