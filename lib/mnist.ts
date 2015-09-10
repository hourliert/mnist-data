/// <reference path="./all.ts" />

import {readFileSync} from 'fs';
import {join} from 'path';

const dataPath = './digits',
      digitsPerFile = 3000,
      numberOfTrainings = 50000;

export class Digit {
  constructor (
    public pixels: number[],
    public value: number
  ) {
    
  }
}

export class MnistData {
  private mnistTraining: Digit[];
  private mnistValidating: Digit[];
  private mnistTesting: Digit[];
  
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
  
  public getOneTraining (): Digit {
    let index = Math.floor(Math.random() * this.mnistTraining.length);
    return this.mnistTraining[index];
  }
  
  public getOneValidating (): Digit {
    let index = Math.floor(Math.random() * this.mnistValidating.length);
    return this.mnistTesting[index];
  }
  
  public getOneTesting (): Digit {
    let index = Math.floor(Math.random() * this.mnistTesting.length);
    return this.mnistTesting[index];
  }
  
  private parseSets (sets: number[][], labels: number[]): Digit[] {
    let digits = [];
    
    for (let i = 0 ; i < sets.length; i++) {
      digits = digits.concat(this.parseOneSet(sets[i], labels, i));
    }
    return digits;
    
  }
  
  private parseOneSet (set: number[], labels: number[], setIndex: number = 20): Digit[] {
    let tmp = [],
        digits = [];
    
    if (set.length % (Math.pow(28, 2)) !== 0) {
      throw new Error(`The length of the testing portion should be a multiple ${3 * Math.pow(28, 2)}`);
    }
    for (let j = 0; j < set.length; j++) {
        
      if (tmp.length === (Math.pow(28, 2))) {
        let index = setIndex * 3000 + Math.floor(j / (Math.pow(28, 2) - 1));
        digits.push(new Digit(tmp, labels[index]));
        tmp = [];
      }
      tmp.push(set[j]);
      
    }
    if (tmp.length === (Math.pow(28, 2))) {
      let index = setIndex * 3000 + Math.floor(set.length / (Math.pow(28, 2) - 1));
      digits.push(new Digit(tmp, labels[index]));
      tmp = [];
    }
    return digits;
    
  }
}