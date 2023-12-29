import eye from "../assets/icons/eye.png";
import gray_eye from "../assets/icons/gray-eye.png";
import eye_off from "../assets/icons/eye-off.png";
import { useState } from "react";

const AppInput = ({
  title = "نام",
  noname,
  optional = false,
  password,
  state,
  setState,
  hasState,
  noicon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("text");
  return (
    <div className="userlist-adduser-popup-form-input-container">
      <label className="flex-col row-gap-8 position-relative">
        {!noname && (
          <div className="flex col-gap-8 ">
            <span>{title}</span>
            {!optional && <span>*</span>}
          </div>
        )}

        <input
          type={password ? passwordType : "text"}
          value={password || hasState ? state : undefined}
          disabled={props.disabled}
          onChange={(e) => {
            if (password || hasState) setState?.(e.target.value);
          }}
          {...props}
        />
        {password && !noicon && (
          <img
            src={showPassword ? eye_off.src : gray_eye.src}
            alt="eye"
            className="eye-icon"
            onClick={() => {
              setShowPassword(!showPassword);
              setPasswordType(showPassword ? "password" : "text");
            }}
          />
        )}
      </label>
    </div>
  );
};

export default AppInput;
