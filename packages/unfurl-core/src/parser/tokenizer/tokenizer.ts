type Quote = '"' | "'" | null;

export function tokenizer(cmd: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let quote: Quote = null;

  for (let i = 0; i < cmd.length; i++) {
    const c = cmd[i];
    /**
     * Non null check for quote. When a quote is found in any format,
     * this is defined, else null. If null, further checks are carried out in
     * next if block
     */
    if (quote) {
      if (c === quote) {
        quote = null;
        //
      } else if (c === '//' && cmd[i + 1] === quote) {
        current += quote;
        i++;
      } else {
        current += c;
      }
      continue;
    }

    /**
     * The following code block guards against poorly formed or invalid cmds
     * Until a quote is defined as a literal quote, it can be assumed
     * that we have not entered the internal component of the string
     */
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    /**
     * Greedy check for space in c position of cmd.
     * If found true, normalize and remove space. These are unsafe.
     */
    if (/\s/.test(c)) {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
      continue;
    }
    /**
     * All things being well, c position of cmd is appended to current parsed string
     */
    current += c;
  }

  if (current.length > 0) tokens.push(current);

  return tokens;
}
