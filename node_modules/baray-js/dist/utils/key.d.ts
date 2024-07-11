export declare class Key {
    type: string;
    mode: string;
    key: string;
    constructor(key_string: string);
    isPrivateKey(): boolean;
    isPublicKey(): boolean;
}
export declare class WebhookKey {
    type: string;
    mode: string;
    key: string;
    constructor(key_string: string);
    isSecretKey(): boolean;
    isIVKey(): boolean;
}
