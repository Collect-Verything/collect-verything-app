export interface Subscription {
    id: number;
    user_stripe_id: string;
    sub_stripe_id: string;
    active_stripe: boolean;
    published: boolean;
    configured: boolean;
    current_period_end: number;
    current_period_start: number;
    createdAt: string;
    updatedAt: string;
    configuration: Configuration;
}

export interface Configuration {
    id: number;
    url: string;
    brand_name: string;
    admin_email: string;
    website_type: string;
    createdAt: string;
    updatedAt: string;
}
