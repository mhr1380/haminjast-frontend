import bottom_arrow from "../assets/icons/bottom-arrow.png";
import { useEffect, useState } from "react";

const AppSelect = ({
  opts,
  value,
  setValue,
  width,
  icon = bottom_arrow,
  list,
  additionalClass,
  zIndex,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(opts);
  useEffect(() => {
    setOptions(opts.filter((item) => item !== value));
    console.log(opts.filter((item) => item !== value));
  }, []);
  return (
    <div
      className="sliderlist-header-select-container"
      style={{
        width: width ? width : "66px",
        // minWidth: width ? width : "66px",
        zIndex: zIndex ? zIndex : "auto",
      }}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div
        className={`sliderlist-header-select ${
          open ? (additionalClass ? `${additionalClass} spec` : "height") : ""
        } ${props.className ? props.className : ""}`}
        style={{ height: open ? `${(options.length + 1) * 28}px` : "32px" }}
      >
        <p className="font-size-16">{value}</p>
        {options.map((item) => {
          if (item === value) {
            return false;
          }
          return (
            <p
              key={item}
              onClick={() => {
                setValue(item);
                setOpen(false);
                setOptions(opts.filter((option) => option !== item));
              }}
              className="font-size-16"
            >
              {item}
            </p>
          );
        })}
      </div>
      <img
        className={`sliderlist-header-select-img ${list ? "list" : ""}`}
        src={icon.src}
        alt="list"
      />
    </div>
  );
};

export default AppSelect;
