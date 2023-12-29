import classes from "../pages/posters.module.css";
import Image from "next/image";
import Link from "next/link";
const lengthOfDescription = 80;
const SmallPoster = ({
  image,
  title,
  description = "",
  found,
  lost,
  location,
  time_description,
  categories,
  id,
  award,
  special_type,
  state,
}) => {
  const checkState = (state) => {
    switch (state) {
      case "accepted":
        return "تایید شده";
      case "rejected":
        return "رد شده";
      case "pending":
        return "در انتظار بررسی";
      default:
        return "در انتظار بررسی";
    }
  };
  const checkStateClass = (state) => {
    switch (state) {
      case "accepted":
        return classes.accepted;
      case "rejected":
        return classes.rejected;
      case "pending":
        return classes.pending;
      default:
        return classes.pending;
    }
  };
  return (
    <Link href={`/poster/${id}`} className={classes.poster}>
      <div className={classes.poster_body} data-testid="test">
        <div className={classes.poster_title}>
          {state ? (
            <>
              {title}{" "}
              <div
                className={`${classes.poster_state} ${checkStateClass(state)}`}
              >
                {checkState(state)}
              </div>
            </>
          ) : (
            title
          )}
        </div>
        <div className={classes.poster_description}>
          {description.length > lengthOfDescription
            ? description.slice(0, lengthOfDescription) + " ..."
            : description}
        </div>

        <div className={classes.badges_container}>
          {categories?.map((cat) => {
            return (
              <div
                key={cat.name}
                className={`${classes.badge} ${classes.category}`}
              >
                {cat.name}
              </div>
            );
          })}
          {award > 0 ? (
            <div className={`${classes.badge} ${classes.reward}`}>مژدگانی </div>
          ) : (
            ""
          )}
          {special_type === "premium" ? (
            <div className={`${classes.badge} ${classes.emergency}`}>ویژه </div>
          ) : (
            ""
          )}
        </div>
        {found && (
          <p className={classes.time_description}>
            {time_description}
            <span className={classes.found}> پیدا شده </span>
            در <b>{location}</b>
          </p>
        )}
        {lost && (
          <p className={classes.time_description}>
            {time_description}
            <span className={classes.lost}> گم شده </span>
            در <b>{location}</b>
          </p>
        )}
      </div>
      <img
        className={classes.poster_image}
        src={image}
        width={150}
        height={150}
      />
    </Link>
  );
};

export default SmallPoster;
