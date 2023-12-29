import classes from "./SearchableSelect.module.css";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOutside";
const SearchableSelect = ({ options, value, setValue, zindex = 10000 }) => {
  const [search, setSearch] = useState(" ");
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState();

  const outOfBoxRef = useRef();
  useEffect(() => {
    setFilteredOptions(options);
    setSearch(value.name);
  }, [options]);
  useEffect(() => {
    const filtered_Options = options?.filter((option) => {
      if (option?.children?.length > 0) {
        const children = option.children.map((child) => {
          return child.name.includes(search);
        });
        return children.includes(true);
      } else {
        return option.name.includes(search);
      }
    });
    setFilteredOptions(filtered_Options);
  }, [search]);
  useOnClickOutside(outOfBoxRef, () => {
    setShowOptions(false);
    if (!value.name) {
      setValue({ name: "هیچکدام" });
    }
    if (value.name) {
      setSearch(value.name);
    }
  });
  return (
    <div className={classes.holder} style={{ zIndex: zindex }}>
      <div
        className={`${classes.container} ${
          showOptions
            ? filteredOptions.length === 0
              ? classes.hide
              : ""
            : classes.hide
        }`}
        ref={outOfBoxRef}
      >
        <input
          className={classes.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setShowOptions(true)}
        />

        <div className={`${classes.options}`}>
          {filteredOptions?.map((option) => {
            if (option?.children?.length > 0) {
              const children = option.children.map((child) => {
                return (
                  <div
                    key={child.name}
                    className={classes.option}
                    style={{ marginRight: child.indent * 16 + "px" }}
                    onClick={() => {
                      setSearch(child.name);
                      setValue(child);
                      setShowOptions(false);
                    }}
                  >
                    {child.name}
                  </div>
                );
              });
              return (
                <>
                  {
                    <div
                      key={option.name}
                      className={classes.option}
                      style={{ marginRight: option.indent * 16 + "px" }}
                      onClick={() => {
                        setSearch(option.name);
                        setValue(option);
                        setShowOptions(false);
                      }}
                    >
                      {option.name}
                    </div>
                  }
                  {children}
                </>
              );
            } else {
              return (
                <div
                  key={option.name}
                  className={classes.option}
                  style={{ marginRight: option.indent * 16 + "px" }}
                  onClick={() => {
                    setSearch(option.name);
                    setValue(option);
                    setShowOptions(false);
                  }}
                >
                  {option.name}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchableSelect;
