import { IntentDetail, IntentPayload } from '../shared/types';

export declare class PrivateClient {
    protected readonly api_key: string;
    protected readonly secret_key: string;
    protected readonly iv_key: string;
    protected readonly wh_secret_key: string;
    protected readonly wh_iv_key: string;
    protected readonly api_gateway: string;
    constructor(api_key: string, secret_key: string, iv_key: string, wh_secret_key: string, wh_iv_key: string);
    encrypt(data: string): string;
    decryptIntent(data: string): string | null;
    createIntent(intent: IntentPayload): Promise<IntentDetail>;
}
