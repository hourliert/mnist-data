/// <reference path="./all.ts" />

import {readFileSync} from 'fs';
import {join} from 'path';

const dataPath = './digits';

class Digit {
  constructor (
    public pixels: number[],
    public value: number
  ) {
    
  }
}

export class MnistData {
  private mnistTraining: Digit[];
  private mnistTesting: Digit[];
  
  constructor(
    size: number = 20
  ) {
    
    let trainings = [],
        testing,
        labels;
        
    for (let i = 0 ; i < size; i++) {
      trainings.push(JSON.parse(readFileSync(join(__dirname, dataPath, `training_${i}.json`)).toString()));
    }
    testing = JSON.parse(readFileSync(join(__dirname, dataPath, `testing.json`)).toString());
    labels = JSON.parse(readFileSync(join(__dirname, dataPath, `mnist_labels.json`)).toString());
    
    this.mnistTraining = this.parseTraining(trainings, labels);
    this.mnistTesting = this.parseTesting(testing, labels);
  }
  
  private parseTraining (trainings: number[][], labels: number[]): Digit[] {
    
    let digits = [];
    
    for (let i = 0 ; i < trainings.length; i++) {
      
      let set = trainings[i],
          cpt = 0,
          tmp = [];
          
      if (set.length % (3 * Math.pow(28, 2)) !== 0) {
        throw new Error(`The length of the ${i} portion should be a multiple ${3 * Math.pow(28, 2)}`);
      }
      for (let j = 0; j < set.length; j += 3) {
        
        if (cpt === (Math.pow(28, 2))) {
          let index = i * 3000 + Math.floor(j / (3 * Math.pow(28, 2)));
          digits.push(new Digit(tmp, labels[index]));
          cpt = 0;
          tmp.length = 0;
        }
        tmp.push(set[j], set[j+1], set[j+2]);
        cpt++;
        
      }
      
    }
    return digits;
    
  }
  
  private parseTesting (testing: number[], labels: number[]): Digit[] {
    
    let digits = [],
        set = testing,
        cpt = 0,
        tmp = [];
        
    if (set.length % (3 * Math.pow(28, 2)) !== 0) {
      throw new Error(`The length of the testing portion should be a multiple ${3 * Math.pow(28, 2)}`);
    }
    for (let j = 0; j < set.length; j += 3) {
        
      if (cpt === (Math.pow(28, 2))) {
        let index = 20 * 3000 + Math.floor(j / (3 * Math.pow(28, 2)));
        digits.push(new Digit(tmp, labels[index]));
        cpt = 0;
        tmp.length = 0;
      }
      tmp.push(set[j], set[j+1], set[j+2]);
      cpt++;
      
    }
    return digits;
    
  }
}