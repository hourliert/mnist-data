/// <reference path="all.d.ts" />
export interface IDigit {
    input: number[];
    output: number[];
    value: number;
}
export declare class MnistData {
    private numberOfTrainingToParse;
    private numberOfTestingToParse;
    private mnistTraining;
    private mnistValidating;
    private mnistTesting;
    constructor(numberOfTrainingToParse?: number, numberOfTestingToParse?: number);
    training: IDigit[];
    validating: IDigit[];
    testing: IDigit[];
    static draw(digit: number[], context: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
    getOneTraining(): IDigit;
    getOneValidating(): IDigit;
    getOneTesting(): IDigit;
    private parseSets(sets, labels);
    private parseOneSet(set, labels, setIndex?);
    private convertDigitisToArray(value);
}
