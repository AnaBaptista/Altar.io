import { Injectable } from '@angular/core';
import { Grid, Occurence } from '../model/grid.model';
import { Constants } from './constants';
@Injectable({
  providedIn: 'root'
})
export class MatrixService {


  private fullAlphabet = Constants.ALPHABET;
  private occurences = new Array<Occurence>();

  constructor() {
    //Init occurences
    for (let i = 0; i < this.fullAlphabet.length; i++) {
      this.occurences.push({ char: this.fullAlphabet.charAt(i), occurence: 0 })
    }

  }
  generateNewMatrix(character: string): Grid {
    let matrix = new Array<Array<string>>();
    let currentAlphabet = this.fullAlphabet

    if (character) {
      currentAlphabet = currentAlphabet.replace(character, '')
    }
    this.occurences.forEach(iter => iter.occurence = 0)

    for (let i = 0; i <= Constants.HEIGHT - 1; i++) {
      let row: string[] = new Array<string>();
      for (let j = 0; j <= Constants.WIDTH - 1; j++) {
        let char = this.generateRandomChar(currentAlphabet)
        row.push(char);
        //saves a count of the chars generated where a is on 0, b is on 1, using index of aphabet, to help calculate code later on
        let idx = this.fullAlphabet.indexOf(char)
        this.occurences[idx].occurence = this.occurences[idx].occurence + 1
      }
      matrix.push(row);
    }

    if (character) {
      matrix = this.fillWeight(character, matrix)
      this.occurences[this.fullAlphabet.indexOf(character)].occurence = Constants.WEIGHT
    }

    return { matrix, code: this.calcCode(matrix), occurences: this.occurences, nrOfCells: Constants.HEIGHT * Constants.WIDTH };
  }

  private generateRandomChar(alphabet: string): string {
    let char: string
    char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    return char;
  }

  private fillWeight(character: string, matrix: Array<Array<string>>): Array<Array<string>> {

    let positions = new Array<number>();
    let i = 0
    while (i < Constants.WEIGHT) {
      let newPosition = Math.floor(Math.random() * 100)
      if (!positions.find((position) => position === newPosition)) {
        matrix[Math.floor(newPosition / 10)][Math.floor(newPosition % 10)] = character;
        ++i;
      }
    }
    return matrix;
  }

  private calcCode(matrix: Array<Array<string>>,): number {
    let seconds = new Date(Date.now()).getSeconds()
    let gridChar1 = matrix[Math.floor(seconds / 10)][Math.floor(seconds % 10)]
    let gridChar2 = matrix[Math.floor(seconds % 10)][Math.floor(seconds / 10)]
    let digit1 = this.occurences[this.fullAlphabet.indexOf(gridChar1)].occurence
    let digit2 = this.occurences[this.fullAlphabet.indexOf(gridChar2)].occurence
    if (digit1 > 9) {
      digit1 = this.findLowestDivider(digit1)
    }
    if (digit2 > 9) {
      digit1 = this.findLowestDivider(digit1)
    }
    return digit1 * 10 + digit2;
  }

  private findLowestDivider(val: number) {
    let res = 0;
    for (let i = 2; i < 100; i++) {
      res = Math.ceil(val / i)
      if (res <= 9) {
        break;
      }
    }
    return res;
  }
}
