import { Compiler, Compilation } from "webpack";
type StringRegExpArray = Array<RegExp | string>;
type ComplexSafelist = {
  standard?: StringRegExpArray;
  deep?: RegExp[];
  greedy?: RegExp[];
  variables?: StringRegExpArray;
  keyframes?: StringRegExpArray;
};
type ExtractorFunction$0<T = string> = (content: T) => string[];
interface Extractors$0 {
  extensions: string[];
  extractor: ExtractorFunction$0;
}
type PathFunction = () => string[];
type SafelistFunction = () => ComplexSafelist;
type BlocklistFunction = () => StringRegExpArray;
interface UserDefinedOptions$0 {
  paths: string[] | PathFunction;
  defaultExtractor?: ExtractorFunction$0;
  extractors?: Array<Extractors$0>;
  fontFace?: boolean;
  keyframes?: boolean;
  moduleExtensions?: string[];
  output?: string;
  rejected?: boolean;
  stdin?: boolean;
  stdout?: boolean;
  variables?: boolean;
  verbose?: boolean;
  safelist?: StringRegExpArray | ComplexSafelist | SafelistFunction;
  blocklist?: StringRegExpArray | BlocklistFunction;
  skippedContentGlobs?: Array<string>;
  dynamicAttributes?: string[];
  only?: string[];
}
type PurgedStats = {
  [index: string]: string[];
};
declare class PurgeCSSPlugin {
  options: UserDefinedOptions$0;
  purgedStats: PurgedStats;
  constructor(options: UserDefinedOptions$0);
  apply(compiler: Compiler): void;
  initializePlugin(compilation: Compilation): void;
  runPluginHook(compilation: Compilation, entryPaths: string[]): Promise<void>;
}
export { PurgeCSSPlugin as default };
