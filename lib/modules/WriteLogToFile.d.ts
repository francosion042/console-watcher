declare class WriteLogToFile {
    appendToNonJSONFile(filePath: string, obj: object): void;
    appendToJSONFile(filePath: string, obj: object): void;
}
declare const _default: WriteLogToFile;
export default _default;