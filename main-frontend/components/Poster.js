/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import classes from "../pages/Home.module.css";
import dot from "../assets/images/dot.png";
import Image from "next/image";

const lengthOfDescription = 50;

const Poster = ({
  image,
  title,
  description,
  found,
  lost,
  location,
  time_description,
}) => {
  return (
    <div className={classes.poster}>
      <img
        className={classes.poster_image}
        src={image}
        width={260}
        height={260}
        alt={title}
      />
      <h2>
        <Image src={dot} width={10} style={{ marginLeft: "8px" }} />
        {title}{" "}
      </h2>
      <p className={classes.poster_description}>
        {description.length > lengthOfDescription
          ? description.slice(0, lengthOfDescription) + " ..."
          : description}
      </p>
      <div className={classes.badges_container}></div>
      {found && (
        <p>
          {time_description + " "}
          <span className={classes.founded}> پیدا شده </span>
          در <b>{location}</b>
        </p>
      )}
      {lost && (
        <p>
          {time_description + " "}
          <span className={classes.lost}> گم شده </span>
          در <b>{location}</b>
        </p>
      )}
    </div>
  );
};

export default Poster;
