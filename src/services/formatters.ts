import moment from "moment";

export function currencyFormat(value: number, currency: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    currencyDisplay: "narrowSymbol",
  });

  return formatter.format(value / 10000);
}

export function dateFormat(value: moment.MomentInput): string {
  return moment(value).format("DD MMM YYYY");
}
