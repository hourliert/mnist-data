/// <reference path="all.d.ts" />
export declare class MnistData {
    private mnistTraining;
    private mnistTesting;
    constructor(size?: number);
    private parseTraining(trainings, labels);
    private parseTesting(testing, labels);
}
