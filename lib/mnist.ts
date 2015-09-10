/// <reference path="./all.ts" />

import {readFileSync} from 'fs';
import {join} from 'path';

const dataPath = './digits';

export class MnistData {
  constructor(
    
  ) {
    for (let i = 0 ; i < 20; i++) {
      var training = readFileSync(join(__dirname, dataPath, `training_${i}.json`));
    }
  }
}