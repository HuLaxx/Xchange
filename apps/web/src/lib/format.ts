export const rupees = (value: number) => new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
export const categories = ["All books", "Fiction", "Non-fiction", "Academic", "Self-help", "Comics", "Other"] as const;
