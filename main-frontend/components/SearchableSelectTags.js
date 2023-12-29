import classes from "./SearchableSelectTags.module.css";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOutside";
const SearchableSelectTags = ({
  options,
  zindex = 10000,
  tags,
  setTags,
  placeholder,
  customStyle,
  maxLengthOfTags = "350px",
}) => {
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const outOfBoxRef = useRef();
  useEffect(() => {
    const tagsId = tags.map((tag) => tag.id);
    const filtered_Options = options?.filter((option) => {
      return !tagsId.includes(option.id);
    });
    setFilteredOptions(filtered_Options ? filtered_Options : []);
  }, [options]);
  useEffect(() => {
    const filtered_Options = options?.filter((option) => {
      return option.name.includes(search);
    });
    setFilteredOptions(filtered_Options);
  }, [search]);
  useOnClickOutside(outOfBoxRef, () => {
    setShowOptions(false);
    setSearch("");
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
          placeholder={placeholder ? placeholder : ""}
          style={customStyle ? customStyle : {}}
        />
        <div className={classes.tags_holder} style={{ width: maxLengthOfTags }}>
          {tags.map((tag) => (
            <div
              key={tag.name}
              className={classes.selected_tags}
              onClick={() => {
                setTags(tags.filter((t) => t.id !== tag.id));
                setFilteredOptions([...filteredOptions, tag]);
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className={`${classes.options}`}>
          {filteredOptions?.map((option) => {
            return (
              <div
                className={classes.option}
                key={option.name}
                onClick={() => {
                  setSearch("");
                  setShowOptions(false);
                  setTags([...tags, option]);
                  const timeOut = setTimeout(() => {
                    setFilteredOptions(
                      filteredOptions.filter((opt) => opt.name !== option.name)
                    );
                    clearTimeout(timeOut);
                  }, 500);
                }}
              >
                {option.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchableSelectTags;
