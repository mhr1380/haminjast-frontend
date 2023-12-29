import MenuLayout from "@/Layout/MenuLayout";
import classes from "../styles/reports.module.css";
import ReportItem from "@/components/ReportItem";
const Reports = () => {
  return (
    <MenuLayout>
      <div className={classes.container}>
        <div className={classes.reports_container}>
          <ReportItem />
          <ReportItem />
          <ReportItem />
          <ReportItem />
          <ReportItem />
          <ReportItem />
          <ReportItem />
          <ReportItem />
          <ReportItem />
        </div>
      </div>
    </MenuLayout>
  );
};

export default Reports;
