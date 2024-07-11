export type IntentPayload = {
    amount: String;
    currency: String;
    order_id: String;
};
export type IntentDetail = {
    _id: string;
    items: any[];
    total_price: string;
    total_discount: string;
    grand_total: string;
    order_date: string;
    org_id: string;
    customer_id: string;
};
export type Mode = "dev" | "uat" | "prod";
