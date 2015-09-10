/// <reference path="all.d.ts" />
export declare class Digit {
    pixels: number[];
    value: number;
    constructor(pixels: number[], value: number);
}
export declare class MnistData {
    private numberOfTrainingToParse;
    private numberOfTestingToParse;
    private mnistTraining;
    private mnistValidating;
    private mnistTesting;
    constructor(numberOfTrainingToParse?: number, numberOfTestingToParse?: number);
    static draw(digit: number[], context: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
    getOneTraining(): Digit;
    getOneValidating(): Digit;
    getOneTesting(): Digit;
    private parseSets(sets, labels);
    private parseOneSet(set, labels, setIndex?);
}
