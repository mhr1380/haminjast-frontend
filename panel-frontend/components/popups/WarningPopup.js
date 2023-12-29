import { useState } from "react";

const WarningPopup = ({
  title,
  subtitle,
  acceptClick,
  show,
  setShow,
  description,
}) => {
  const [text, setText] = useState("");
  return (
    <div className={`newspage-delete-popup-container ${show ? "show" : ""}`}>
      <div className="newspage-delete-popup-body">
        <h3>{title}</h3>

        <p>{subtitle}</p>
        {description && (
          <textarea
            className="newspage-delete-popup-textarea"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        )}
        <div className="newspage-delete-popup-btns-container">
          <button
            className="btn-cancel"
            onClick={() => {
              setShow(false);
            }}
          >
            انصراف
          </button>
          <button
            className="btn-accept"
            onClick={() => {
              acceptClick(text);
            }}
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;
