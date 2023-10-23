export type TransactionsType = {
  transaction_id: number;
  customer_name: string;
  customer_phone: number;
  customer_email: string;
  transaction_amount: number;
  payment_method: string;
  order_status: string;
  transaction_date: string;
};

export type TransactionOrdersType = {
  order_id: number;
  transaction_id: number;
  product_name: string;
  variant_name: string;
  order_quantity: number;
  order_status: string;
  order_total: string;
  date: string;
  overall_total: string;
};