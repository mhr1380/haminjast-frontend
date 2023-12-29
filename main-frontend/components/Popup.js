import classes from "../styles/Popup.module.css";
import useOnClickOutside from "../hooks/useOutside";
import { useRef } from "react";
const Popup = ({ phone, setShow, telegram_id }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));
  return (
    <div className={classes.popup_container}>
      <div className={classes.popup_body} ref={ref}>
        <div className={classes.title}>اطلاعات تماس</div>
        {phone && (
          <div className={classes.phone}>
            <div>شماره تماس</div>
            <a href={`tel:${phone}`} className={classes.call_button}>
              {phone}
            </a>
          </div>
        )}
        {telegram_id && (
          <div className={classes.phone}>
            <div>ایدی تلگرام</div>
            <a
              href={`https://t.me/${telegram_id}`}
              className={classes.call_button}
            >
              {telegram_id}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
