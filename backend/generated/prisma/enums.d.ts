export declare const UserRole: {
    readonly CUSTOMER: "CUSTOMER";
    readonly EXECUTOR: "EXECUTOR";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const OrderStatus: {
    readonly DRAFT: "DRAFT";
    readonly CREATED: "CREATED";
    readonly PAID: "PAID";
    readonly ACCEPTED: "ACCEPTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CLOSED: "CLOSED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly SUCCEEDED: "SUCCEEDED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
//# sourceMappingURL=enums.d.ts.map