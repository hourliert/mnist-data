/// <reference path="./all.ts" />

import {readFileSync} from 'fs';
import {join} from 'path';

const dataPath = './digits',
      digitsPerFile = 3000,
      numberOfTrainings = 50000,
      imageWidth = 28,
      imageHeight = 28;


export interface IDigit {
  input: number[]; //nervous format. array of pixels
  output: number[]; //nervous format. 10 zeros except the one which has its index equals to the digit the value.
  value: number;
}

export class MnistData {
  private mnistTraining: IDigit[];
  private mnistValidating: IDigit[];
  private mnistTesting: IDigit[];
  
  constructor(
    private numberOfTrainingToParse: number = 20,
    private numberOfTestingToParse: number = 1
  ) {
    
    let trainings = [],
        testing,
        labels;
        
    for (let i = 0 ; i < numberOfTrainingToParse; i++) {
      trainings.push(JSON.parse(readFileSync(join(__dirname, dataPath, `training_${i}.json`)).toString()));
    }
    testing = JSON.parse(readFileSync(join(__dirname, dataPath, `testing.json`)).toString());
    labels = JSON.parse(readFileSync(join(__dirname, dataPath, `mnist_labels.json`)).toString());
    
    this.mnistTraining = this.parseSets(trainings, labels);
    this.mnistTesting = this.parseOneSet(testing, labels);
    this.mnistValidating = this.mnistTraining.splice(numberOfTrainings);
  }
  
  get training(): IDigit[] {
    return this.mnistTraining;
  }
  
  get validating(): IDigit[] {
    return this.mnistValidating;
  }
  
  get testing(): IDigit[] {
    return this.mnistTesting;
  }
  
  static draw (digit: number[], context: CanvasRenderingContext2D, offsetX: number, offsetY: number) {
    
    var imageData = context.getImageData(offsetX || 0, offsetY || 0, imageWidth, imageHeight);
    for (var i = 0; i < digit.length; i++) {
      imageData.data[i * 4] = Math.floor(digit[i] * 255);
      imageData.data[i * 4 + 1] = Math.floor(digit[i] * 255);
      imageData.data[i * 4 + 2] = Math.floor(digit[i] * 255);
    }
    context.putImageData(imageData, offsetX || 0, offsetY || 0);
    
  }
  
  public getOneTraining (): IDigit {
    let index = Math.floor(Math.random() * this.mnistTraining.length);
    return this.mnistTraining[index];
  }
  
  public getOneValidating (): IDigit {
    let index = Math.floor(Math.random() * this.mnistValidating.length);
    return this.mnistTesting[index];
  }
  
  public getOneTesting (): IDigit {
    let index = Math.floor(Math.random() * this.mnistTesting.length);
    return this.mnistTesting[index];
  }
  
  private parseSets (sets: number[][], labels: number[]): IDigit[] {
    let digits = [];
    
    for (let i = 0 ; i < sets.length; i++) {
      digits = digits.concat(this.parseOneSet(sets[i], labels, i));
    }
    return digits;
    
  }
  
  private parseOneSet (set: number[], labels: number[], setIndex: number = 20): IDigit[] {
    let tmp = [],
        digits = [];
    
    if (set.length % (Math.pow(28, 2)) !== 0) {
      throw new Error(`The length of the testing portion should be a multiple ${3 * Math.pow(28, 2)}`);
    }
    for (let j = 0; j < set.length; j++) {
        
      if (tmp.length === (Math.pow(28, 2))) {
        let index = setIndex * 3000 + Math.floor(j / (Math.pow(28, 2)));
        digits.push({
          input: tmp,
          output: this.convertDigitisToArray(labels[index - 1]),
          value: labels[index - 1]
        });
        tmp = [];
      }
      tmp.push(set[j]);
      
    }
    if (tmp.length === (Math.pow(28, 2))) {
      let index = setIndex * 3000 + Math.floor(set.length / (Math.pow(28, 2)));
      digits.push({
        input: tmp,
        output: this.convertDigitisToArray(labels[index - 1]),
        value: labels[index - 1]
      });
      tmp = [];
    }
    return digits;
    
  }
  
  private convertDigitisToArray (value: number): number[] {
    
    let res = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);
    
    res = res.map((x, i) => {
      if (i === value) {
        return 1;
      }
      return 0;
    })
    
    return res;
    
  }
}