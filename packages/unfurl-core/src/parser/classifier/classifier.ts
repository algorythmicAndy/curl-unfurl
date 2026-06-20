import { METHOD_SET } from '../constants';
import type { ClassifiedItems } from '../sharedUtilityTypes';

export function Classifier(tokens: string[]): ClassifiedItems {
  const items: ClassifiedItems = [];
  tokens[0] === 'curl' && tokens.shift();
  const tokenLength = tokens.length;
  for (let i = 0; i < tokenLength; i++) {
    const tokenIndex = i;
    const token = tokens[i];
    if (!token.startsWith('-')) {
      try {
        const tryUrl = new URL(tokens[i]);
        if (tryUrl.protocol === 'http:' || tryUrl.protocol === 'https:') {
          items.push({
            kind: 'url',
            url: token,
            tokenIndex,
          });
          continue;
        }
      } catch {}
    }
    if (METHOD_SET.has(token.toUpperCase())) {
      items.push({
        kind: 'method',
        rawFlag: '-X',
        method: token,
        tokenIndex,
      });
      continue;
    }
    switch (token) {
      case '-X':
        items.push({
          kind: 'method',
          rawFlag: token,
          method: tokens[++i],
          tokenIndex,
        });
        break;
      case '-H':
      case '--header':
        items.push({
          kind: 'header',
          rawFlag: token,
          rawValue: tokens[++i],
          tokenIndex,
        });
        break;
      case '--data':
      case '-d':
        const nextToken = tokens[i + 1];
        const isFileUpload = tokens[i + 1].startsWith('@');
        items.push({
          kind: 'body',
          flagType: isFileUpload ? 'data-file' : 'data',
          rawFlag: token,
          rawValue: nextToken,
          isFileUpload,
          tokenIndex,
        });
        i++;
        break;
      case '--data-raw':
        items.push({
          kind: 'body',
          flagType: 'data-raw',
          rawFlag: token,
          rawValue: tokens[++i],
          isFileUpload: false,
          tokenIndex,
        });
        break;
      case '--data-binary':
        items.push({
          kind: 'body',
          flagType: 'data-binary',
          rawFlag: token,
          rawValue: tokens[++i],
          isFileUpload: false,
          tokenIndex,
        });
        break;
      case '--data-urlencode':
        items.push({
          kind: 'body',
          flagType: 'data-urlencode',
          rawFlag: token,
          rawValue: tokens[++i],
          isFileUpload: false,
          tokenIndex,
        });
        break;
      case '-u':
      case '--user':
      case '--oauth2-bearer':
        items.push({
          kind: 'auth',
          rawFlag: token,
          rawValue: tokens[++i],
          tokenIndex,
        });
        break;
      case '--compressed':
      case '--compressed-ssh':
        items.push({
          kind: 'compression',
          rawFlag: token,
          tokenIndex,
        });
        break;
      default:
        items.push({
          kind: 'misc',
          rawFlag: token,
          tokenIndex,
        });
    }
  }

  return items;
}
