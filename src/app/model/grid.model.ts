export declare interface Grid {
  matrix: Array<Array<string>>;
  code: number;
  occurences?: Array<Occurence>;
  nrOfCells?: number;
}

export declare interface Occurence {
  char: string;
  occurence: number;
}



export type Char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k'
  | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x'
  | 'y' | 'z'
