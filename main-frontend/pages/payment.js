import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { http } from "../http-services/http";

const Payment = () => {
  const [status, setStatus] = useState("درحال بررسی پرداخت ... ");
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query.trackId && auth.token) {
        const { trackId } = router.query;
        try {
          const { data } = await http.get(
            `/api/v1/users/authorize/payment/user_wallet/verify?track_id=${trackId}`,
            { headers: { Authorization: `Bearer ${auth.token}` } }
          );

          if (data.message === "payment is successful") {
            setStatus("پرداخت موفق آمیز بود ، در حال بازگشت ...");
            const timer = setTimeout(() => {
              router.push("/my-wallet");
              clearTimeout(timer);
            }, 2000);
          } else {
            setStatus("پرداخت با خطا مواجه شد ، در حال بازگشت ...");
            const timer = setTimeout(() => {
              router.push("/my-wallet");
              clearTimeout(timer);
            }, 2000);
          }
        } catch (error) {
          setStatus("پرداخت با خطا مواجه شد ، در حال بازگشت ...");
          const timer = setTimeout(() => {
            router.push("/my-wallet");
            clearTimeout(timer);
          }, 2000);
        }
      }
    })();
  }, [router.query, auth.token]);
  return (
    <div
      style={{
        marginTop: "32px",
        width: "100%",
        textAlign: "center",
        fontSize: "20px",
      }}
    >
      {status}
    </div>
  );
};

export default Payment;
