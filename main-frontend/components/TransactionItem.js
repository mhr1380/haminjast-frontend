import classes from "../pages/my-wallet.module.css";
const TransactionItem = ({ date, amount, state }) => {
  return (
    <div className={classes.transaction_item}>
      <div className={classes.transaction_subitem}>
        {new Date(date).toISOString().split("T")[0]}
      </div>
      <div className={classes.transaction_subitem}>{amount}</div>
      <div
        className={`${stateToPersian(state, classes).class} ${
          classes.transaction_subitem
        }`}
      >
        {stateToPersian(state).state}
      </div>
    </div>
  );
};

export default TransactionItem;
const stateToPersian = (state, classes = {}) => {
  switch (state) {
    case "pending":
      return { state: "در حال بررسی", class: "" };
    case "paid":
      return { state: "موفق", class: classes?.success };
    case "failed":
      return { state: "ناموفق", class: classes?.failed };
    default:
      return { state: "در حال بررسی", class: classes?.success };
  }
};
