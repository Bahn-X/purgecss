import internal from "stream";
interface RawContent<T = string> {
  extension: string;
  raw: T;
}
interface RawCSS {
  raw: string;
}
interface ExtractorResultDetailed {
  attributes: {
    names: string[];
    values: string[];
  };
  classes: string[];
  ids: string[];
  tags: string[];
  undetermined: string[];
}
type ExtractorResult = ExtractorResultDetailed | string[];
type ExtractorFunction<T = string> = (content: T) => ExtractorResult;
interface Extractors {
  extensions: string[];
  extractor: ExtractorFunction;
}
type StringRegExpArray = Array<RegExp | string>;
type ComplexSafelist = {
  standard?: StringRegExpArray;
  deep?: RegExp[];
  greedy?: RegExp[];
  variables?: StringRegExpArray;
  keyframes?: StringRegExpArray;
};
type UserDefinedSafelist = StringRegExpArray | ComplexSafelist;
interface UserDefinedOptions {
  content: Array<string | RawContent>;
  css: Array<string | RawCSS>;
  defaultExtractor?: ExtractorFunction;
  extractors?: Array<Extractors>;
  fontFace?: boolean;
  keyframes?: boolean;
  output?: string;
  rejected?: boolean;
  stdin?: boolean;
  stdout?: boolean;
  variables?: boolean;
  safelist?: UserDefinedSafelist;
  blocklist?: StringRegExpArray;
  skippedContentGlobs?: Array<string>;
  dynamicAttributes?: string[];
}
type PurgeCSSUserDefinedOptions = UserDefinedOptions;
interface UserDefinedOptions$0
  extends Omit<PurgeCSSUserDefinedOptions, "css" | "content"> {
  content: string[];
}
declare function gulpPurgeCSS(
  options: UserDefinedOptions$0
): internal.Transform;
export { gulpPurgeCSS as default };
