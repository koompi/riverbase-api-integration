import { CHILD_EMIT, MESSAGE_TYPE, PARENT_EMIT } from "./constants";
export declare function getResponse(id: string): string;
export interface IGetRequest {
    id: string;
    property: string;
    args: Array<any>;
}
export interface IGetResponse {
    id: string;
    property: string;
    value?: any;
    error?: any;
}
export interface IChildEmit {
    type: typeof MESSAGE_TYPE;
    kind: typeof CHILD_EMIT;
    eventName: string;
    data: unknown;
}
export interface IParentEmit {
    type: typeof MESSAGE_TYPE;
    kind: typeof PARENT_EMIT;
    eventName: string;
    data: any;
}
export declare function createChildEmit(eventName: string, data: unknown): IChildEmit;
export declare function createParentEmit(eventName: string, data: unknown): IParentEmit;
