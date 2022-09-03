import Payment from "./Payment";

interface CreatePaymentData extends Omit<Payment, "id"> {}
