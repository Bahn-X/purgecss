import { Compiler, Stats } from "webpack";
import { compilation as compilationType } from "webpack";
declare type ExtractorFunction = (content: string) => string[];
interface Extractors {
  extensions: string[];
  extractor: ExtractorFunction;
}
declare type PathFunction = () => string[];
declare type WhitelistFunction = () => string[];
declare type WhitelistPatternsFunction = () => Array<RegExp>;
interface UserDefinedOptions {
  paths: string[] | PathFunction;
  defaultExtractor?: ExtractorFunction;
  extractors?: Array<Extractors>;
  fontFace?: boolean;
  keyframes?: boolean;
  moduleExtensions?: string[];
  output?: string;
  rejected?: boolean;
  stdin?: boolean;
  stdout?: boolean;
  variables?: boolean;
  verbose?: boolean;
  whitelist?: string[] | WhitelistFunction;
  whitelistPatterns?: Array<RegExp> | WhitelistPatternsFunction;
  whitelistPatternsChildren?: Array<RegExp> | WhitelistPatternsFunction;
  only?: string[];
}
declare type PurgedStats = {
  [index: string]: string[];
};
interface PurgeAsset {
  asset: {
    source: () => string;
  };
  name: string;
}
declare function files(chunk: any, extensions: string[]): any[];
declare type Compilation = compilationType.Compilation;
export default class PurgeCSSPlugin {
  options: UserDefinedOptions;
  purgedStats: PurgedStats;
  constructor(options: UserDefinedOptions);
  apply(compiler: Compiler): void;
  onHooksCompilation(compilation: Compilation): Promise<void>;
  onHooksDone(stats: Stats, callback: () => void): Promise<void>;
  getAssetsToPurge(
    assetsFromCompilation: PurgeAsset[],
    files: string[]
  ): PurgeAsset[];
  initializePlugin(compilation: Compilation): void;
  runPluginHook(compilation: Compilation, entryPaths: string[]): Promise<void>;
}
