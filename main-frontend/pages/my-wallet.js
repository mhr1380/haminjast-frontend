/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./my-wallet.module.css";
import AppHeader from "../Layout/AppHeader";
import { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { router } from "websocket";
import { useRouter } from "next/router";
import { http } from "../http-services/http";
const depositOptions = ["50000", "100000", "200000", "500000"];
const MyWallet = () => {
  const { auth, setAuth } = useAuth();
  const [depositAmount, setDepositAmount] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);

  const [balance, setBalance] = useState(0);
  const router = useRouter();
  useEffect(() => {
    console.log(auth);
    if (auth)
      if (!auth.token && !auth.showLoginPopup)
        setAuth((prev) => ({ ...prev, showLoginPopup: true }));

    if (auth.token) {
      (async () => {
        const { data } = await http.get(
          "/api/v1/users/authorize/payment/user_wallet/transactions",
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        const { data: user } = await http.get("/api/v1/users/authorize/", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setBalance(user.wallet);
        setAllTransactions(data ? data : []);
      })();
    }
  }, [auth.token, auth]);
  return (
    <>
      <AppHeader></AppHeader>
      <div className={classes.container}>
        <div className={classes.balance_container}>
          موجودی کیف پول : {balance.toLocaleString()} ریال
        </div>
        <div className={classes.deposit_container}>
          <span className={classes.currency}>ریال</span>
          <input
            className={classes.deposit_input}
            placeholder="مبلغ مورد نظر را وارد کنید"
            value={depositAmount}
            onChange={(e) => {
              setDepositAmount(e.target.value);
            }}
          />
          <button
            className={classes.deposit_button}
            onClick={async () => {
              if (depositAmount > 0) {
                const { data } = await http.get(
                  `/api/v1/users/authorize/payment/user_wallet?url=https://haminjast.iran.liara.run/payment&amount=${depositAmount}`,
                  {
                    headers: { Authorization: `Bearer ${auth.token}` },
                  }
                );
                router.push(data.redirect);
              }
            }}
          >
            افزایش موجودی
          </button>
        </div>
        <div className={classes.deposit_options_container}>
          {depositOptions.map((d, index) => (
            <div
              key={index}
              className={classes.desposit_options_item}
              onClick={() => {
                setDepositAmount(d);
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div className={classes.transactions_container}>
          <div className={classes.transaction_header}>تراکنش های من</div>
          <div className={classes.transactions_list}>
            <div className={classes.transaction_list_header}>
              <div className={classes.transaction_list_header_item}>تاریخ</div>
              <div className={classes.transaction_list_header_item}>مبلغ</div>
              <div className={classes.transaction_list_header_item}>وضعیت</div>
            </div>
            <div className={classes.transaction_list_body}>
              {allTransactions.map((t) => (
                <TransactionItem
                  key={t.id}
                  amount={t.amount}
                  date={t.created_at}
                  state={t.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWallet;
