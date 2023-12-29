import MenuLayout from "@/Layout/MenuLayout";
import classes from "../../styles/posters.module.css";
import bicycle from "../../assets/images/bicycle.png";
import bic from "../../assets/images/bic.webp";
import Image from "next/image";
import SmallPoster from "@/components/SmallPoster";
import WarningPopup from "@/components/popups/WarningPopup";
import { useState } from "react";
const posters = [
  {
    id: 1,
    title: "دوچرخه",
    address: [{ address_detail: "صادقیه" }],
    images: [bicycle, bicycle, bicycle],
    categories: [{ name: "فوری" }, { name: "دسته کلید" }],
    description:
      "یک دوچرخه در فلان جا گم شده است ، از یابنده تقاضا میشود که با شماره ذکر شده تماس بگیرد یشتر ...",
    time_description: "3 دقیقه پیش",
    status: "found",
  },
  {
    id: 2,
    title: "دوچرخه",
    address: [{ address_detail: "صادقیه" }],
    images: [bicycle, bicycle, bicycle, bicycle],
    categories: [{ name: "فوری" }, { name: "دوچرخه" }, { name: "مژدگانی" }],
    description:
      "یک دوچرخه در فلان جا گم شده است ، از یابنده تقاضا میشود که با شماره ذکر شده تماس بگیرد یشتر ...",
    time_description: "3 دقیقه پیش",
    status: "found",
  },
  {
    id: 3,
    title: "دوچرخه",
    address: [{ address_detail: "صادقیه" }],
    images: [bic],
    categories: [{ name: "فوری" }, { name: "دسته کلید" }],
    description:
      "یک دوچرخه در فلان جا گم شده است ، از یابنده تقاضا میشود که با شماره ذکر شده تماس بگیرد یشتر ...",
    time_description: "3 دقیقه پیش",
    status: "found",
  },
  {
    id: 4,
    title: "دوچرخه",
    address: [{ address_detail: "صادقیه" }],
    images: [bicycle, bic],
    categories: [{ name: "فوری" }, { name: "دسته کلید" }],
    description:
      "یک دوچرخه در فلان جا گم شده است ، از یابنده تقاضا میشود که با شماره ذکر شده تماس بگیرد یشتر ...",
    time_description: "3 دقیقه پیش",
    status: "found",
  },
  {
    id: 5,
    title: "دوچرخه",
    address: [{ address_detail: "صادقیه" }],
    images: [bicycle, bic],
    categories: [{ name: "فوری" }, { name: "دسته کلید" }],
    description:
      "یک دوچرخه در فلان جا گم شده است ، از یابنده تقاضا میشود که با شماره ذکر شده تماس بگیرد یشتر ...",
    time_description: "3 دقیقه پیش",
    status: "found",
  },
];
const Posters = () => {
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  return (
    <MenuLayout>
      <WarningPopup
        show={showRejectPopup}
        setShow={setShowRejectPopup}
        title="رد آگهی"
        subtitle="دلیل خود را بنویسید ( این پیام برای کاربر ارسال میشود )"
        description
        acceptClick={(text) => {
          console.log(text);
          setShowRejectPopup(false);
        }}
      />
      <div className={classes.container}>
        <div className={classes.posters_container}>
          {posters.map((poster) => (
            <SmallPoster
              id={poster.id}
              key={poster.id}
              title={poster.title}
              description={poster.description}
              images={poster.images}
              categories={poster.categories}
              address={poster.address}
              status={poster.status}
              onRejectClick={() => setShowRejectPopup(true)}
            />
          ))}
        </div>
      </div>
    </MenuLayout>
  );
};

export default Posters;
