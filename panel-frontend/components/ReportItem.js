import classes from "../styles/reports.module.css";
const ReportItem = () => {
  return (
    <>
      <div className={classes.report_container}>
        <div className={classes.report_title}>
          عنوان گزارش : مشکلی در اپ پیش اومده
        </div>
        <div className={classes.report_description}>
          توضیحات : لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
          با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است.
        </div>
        <div className={classes.button_container}>
          <button className={classes.report_button}>اطلاعات بیشتر</button>
        </div>
      </div>
    </>
  );
};

export default ReportItem;
