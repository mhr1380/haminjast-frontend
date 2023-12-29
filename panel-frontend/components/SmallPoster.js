import Link from "next/link";
import classes from "../styles/posters.module.css";
import Image from "next/image";

const SmallPoster = ({
  id,
  title,
  description,
  categories,
  images,
  address,
  status,
  onRejectClick,
}) => {
  return (
    <div className={classes.poster_body}>
      <div className={classes.title_container}>
        <h2 className={classes.poster_title}>{title}</h2>
        <div className={classes.badges_container}>
          {categories?.map((cat) => {
            if (cat.name === "فوری") {
              return (
                <div className={`${classes.badge} ${classes.emergency}`}>
                  فوری
                </div>
              );
            }
            if (cat.name === "مژدگانی") {
              return (
                <div className={`${classes.badge} ${classes.reward}`}>
                  مژدگانی{" "}
                </div>
              );
            }
            return (
              <div className={`${classes.badge} ${classes.category}`}>
                {cat.name}
              </div>
            );
          })}
        </div>
      </div>

      <p>{description}</p>

      <div className={classes.poster_images_container}>
        {images.map((image) => {
          return (
            <Image
              src={image}
              className={classes.poster_image}
              width={70}
              height={70}
            />
          );
        })}
      </div>
      <div className="flex justify-between align-center">
        <div className={classes.location_container}>
          <span className={status === "found" ? classes.found : classes.lost}>
            {" "}
            {status === "found" ? "پیدا شده" : "گم شده"}{" "}
          </span>{" "}
          {console.log(status)}
          در
          <span className={classes.location}>
            {" "}
            {address?.length > 0 ? address[0].address_detail : ""}{" "}
          </span>
        </div>
        <div className={classes.poster_buttons_container}>
          <button
            className={classes.poster_reject_button}
            onClick={() => {
              onRejectClick(id);
            }}
          >
            رد آگهی
          </button>
          <button className={classes.poster_accept_button}>تایید آگهی</button>
          <Link href={`/posters/${id}`}>
            <button className={classes.poster_edit_button}>ویرایش آگهی</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallPoster;
