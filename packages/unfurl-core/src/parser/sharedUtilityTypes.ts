type ClassifiedKind =
  | 'body'
  | 'header'
  | 'auth'
  | 'url'
  | 'method'
  | 'compression'
  | 'misc';

type BaseItem = {
  kind: ClassifiedKind;
  tokenIndex: number;
};

type FlagKind =
  | 'data'
  | 'data-raw'
  | 'data-binary'
  | 'data-urlencode'
  | 'data-file';

type BodyFlagItem = BaseItem & {
  kind: 'body';
  rawFlag: string;
  rawValue: string;
  flagType: FlagKind;
  isFileUpload: boolean;
};

type AuthFlagItem = BaseItem & {
  kind: 'auth';
  rawFlag: string;
  rawValue: string;
};

export type HeaderFlagItem = BaseItem & {
  kind: 'header';
  rawFlag: string;
  rawValue: string;
};

type URLItem = BaseItem & {
  kind: 'url';
  url: string;
};

export type MethodFlagItem = BaseItem & {
  kind: 'method';
  method: string;
  rawFlag: string;
};

type CompressionFlagItem = BaseItem & {
  kind: 'compression';
  rawFlag: string;
};

type MiscFlagItem = BaseItem & {
  kind: 'misc';
  rawFlag: string;
};

export type ClassifiedItem =
  | BodyFlagItem
  | HeaderFlagItem
  | AuthFlagItem
  | URLItem
  | MethodFlagItem
  | CompressionFlagItem
  | MiscFlagItem;

export type ClassifiedItems = ClassifiedItem[];

type BaseNode = {
  type: ClassifiedKind;
  raw: string | null;
  source: string | 'implicit';
  tokenIndex: number;
};

export type NormalizeMethodNode = BaseNode & {
  type: 'method';
  method: string | 'GET';
  warnings: string[];
};

export type CanonicalCompiler = {
  canonicalKey: string;
  canonicalValue: string;
  tokenIndex: number;
  dismissedValues: string[];
  warnings: string[];
};

export type NormalizeHeaderNode = CanonicalCompiler[];
