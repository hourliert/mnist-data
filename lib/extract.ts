/// <reference path="./all.ts" />

import {createReadStream, writeFile} from 'fs';
import {join} from 'path';
import * as NodePng from 'node-png';
import * as _ from 'lodash';

const PNG = NodePng.PNG;

const size = 2;
 
const dataPath = './digits/',
      exportPath = './digits/';

function convertImage (imagePath) {
  return new Promise(function(resolve, reject) {
    createReadStream(imagePath)
    .pipe(new PNG())
    .on('error', function() {
      reject();
    })
    .on('parsed', function(data) {
      console.log(`${imagePath} parsed`);
      var local = [];
      
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
  
          local.push(this.data[idx], this.data[idx+1], this.data[idx+2]);
        }
      }
      
     resolve(local);
    });
  });
}

function writeJson (jsonPath, data) {
  return new Promise(function(resolve, reject) {
    writeFile(jsonPath, JSON.stringify(_.flatten(data)), (error) => {
       if (error) {
         reject(error);
       }
       console.log(`${jsonPath} savedd`);
       resolve(true);
    })
  });
}

function completeDataset (trainings: number[][], testing: number[]) {
  var p = [];
  
  for (let i in trainings) {
    console.log(`Scheduling writting of ${i}.`);
    p.push(writeJson(join(__dirname, dataPath, `training_${i}.json`), trainings[i]));
  }
  console.log(`Scheduling writting of ${trainings.length}.`);
  p.push(writeJson(join(__dirname, dataPath, `testing.json`), testing));
  
  Promise.all(p).then(() => {
    console.log('Export done.');
  });
}

function bootstrap () {
  var p = [];
  
  console.log('Starting extraction');  
  for (let i = 0; i < size; i++) {
    console.log(`Scheduling ${i}`);
    p.push(convertImage(join(__dirname, dataPath, `mnist_batch_${i}.png`)));
  }
  
  Promise.all(p).then((images) => {
    let testing = images.splice(images.length -1);
    completeDataset(images, testing);
  });
}

bootstrap();



