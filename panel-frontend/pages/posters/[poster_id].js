import MenuLayout from "@/Layout/MenuLayout";
import { useRouter } from "next/router";
import bicycle from "../../assets/images/bicycle.png";
import bic from "../../assets/images/bic.webp";
import Image from "next/image";
import classes from "../../styles/poster.module.css";
import dynamic from "next/dynamic";
import {
  HiOutlineBookmark,
  HiOutlineShare,
  HiOutlineTrash,
  HiTrash,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import black_edit from "../../assets/icons/black-edit.png";
import { Navigation, Pagination } from "swiper";
import { HiX } from "react-icons/hi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import WarningPopup from "@/components/popups/WarningPopup";
let swiperInstance = null;

// const NeshanMap = dynamic(
//   () => import("react-neshan-map-leaflet/dist/NeshanMap"),
//   {
//     ssr: false,
//   }
// );
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
const SinglePoster = () => {
  const [slider, setSlider] = useState(0);
  const [poster, setPoster] = useState(posters[0]); // TODO: get poster from api
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const router = useRouter();

  const titleRef = useRef();
  useEffect(() => {
    if (router.query.poster_id) {
      const poster = posters.find(
        (poster) => poster.id == router.query.poster_id
      );
      setPoster(poster);
    }
  }, [router]);

  return (
    <MenuLayout>
      <WarningPopup
        show={showDeletePopup}
        setShow={setShowDeletePopup}
        title="رد آگهی"
        subtitle="دلیل خود را بنویسید ( این پیام برای کاربر ارسال میشود )"
        description
        acceptClick={(text) => {
          console.log(text);
          setShowDeletePopup(false);
        }}
      />
      <>
        <div className={classes.container}>
          <div className={classes.poster_container}>
            <div className={classes.details_container}>
              <div className={classes.title_container}>
                <input
                  className={classes.poster_title}
                  value={poster?.title}
                  ref={titleRef}
                  onChange={(e) => {
                    setPoster({ ...poster, title: e.target.value });
                  }}
                />
              </div>
              <div className={classes.badges_container}>
                {poster?.categories?.map((cat) => {
                  if (cat.name === "فوری") {
                    return (
                      <div
                        className={`${classes.badge} ${classes.emergency}`}
                        onClick={() => {
                          setPoster({
                            ...poster,
                            categories: poster.categories.filter(
                              (cat) => cat.name !== "فوری"
                            ),
                          });
                        }}
                      >
                        <HiX
                          size="12px"
                          color="#535353"
                          className={classes.badge_x}
                        />
                        فوری
                      </div>
                    );
                  }
                  if (cat.name === "مژدگانی") {
                    return (
                      <div
                        className={`${classes.badge} ${classes.reward}`}
                        onClick={() => {
                          setPoster({
                            ...poster,
                            categories: poster.categories.filter(
                              (cat) => cat.name !== "مژدگانی"
                            ),
                          });
                        }}
                      >
                        <HiX
                          size="12px"
                          color="#535353"
                          className={classes.badge_x}
                        />
                        مژدگانی{" "}
                      </div>
                    );
                  }
                  return (
                    <div
                      className={`${classes.badge} ${classes.category}`}
                      onClick={() => {
                        setPoster({
                          ...poster,
                          categories: poster.categories.filter(
                            (category) => category.name !== cat.name
                          ),
                        });
                      }}
                    >
                      <HiX
                        size="12px"
                        color="#535353"
                        className={classes.badge_x}
                      />

                      {cat.name}
                    </div>
                  );
                })}
              </div>

              <textarea
                value={poster?.description}
                onChange={(e) => {
                  setPoster({ ...poster, description: e.target.value });
                }}
                className={classes.poster_description}
              />
              <div className="flex col-gap-8">
                {" "}
                <p>
                  {"3 دقیقه پیش" + " "}
                  {poster?.status === "found" ? (
                    <span className={classes.found}> پیدا شده </span>
                  ) : (
                    <span className={classes.lost}> گم شده </span>
                  )}
                  در
                  <b>
                    {poster?.address.length > 0
                      ? " " + poster.address[0].address_detail
                      : ""}
                  </b>
                </p>
                {/* <Image src={black_edit} width={20} height={20} /> */}
              </div>
              <div className={classes.map_container}>
                موقعیت
                {/* <NeshanMap
                  options={{
                    key: "web.66cfce07db6049a6a227e68668211488",
                    center: latLong,
                    zoom: 13,
                  }}
                  style={{
                    width: "100%",
                    height: "270px",
                    borderRadius: "4px",
                    border: "2px solid #efefefcc",
                  }}
                  onInit={(L, myMap) => {
                    let marker = L.marker(latLong)
                      .addTo(myMap)
                      .bindPopup("اینجا گم کردم");

                    myMap.on("click", function (e) {
                      marker.setLatLng(e.latlng);
                    });
                    L.circle(latLong, {
                      color: "red",
                      fillColor: "#f03",
                      fillOpacity: 0.5,
                      radius: 500,
                    }).addTo(myMap);
                  }}
                /> */}
              </div>
            </div>
            <div className={classes.media_container}>
              <div className={classes.slider_container}>
                <Swiper
                  slidesPerView={1}
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  onSlideChange={(swiper) => {
                    setSlider(swiper.activeIndex);
                    console.log(swiper);
                  }}
                  onSwiper={(swiper) => {
                    swiper.activeIndex = slider;
                    swiperInstance = swiper;
                  }}
                  className="swiper-slide"
                  width={500}
                  height={360}
                >
                  {poster?.images.map((slide, index) => {
                    return (
                      <SwiperSlide key={index} className={classes.swiper_slide}>
                        <Image
                          className={classes.slide_image}
                          src={slide}
                          width={500}
                          height={360}
                        />
                        <div
                          className={classes.slider_trash_container}
                          onClick={() => {
                            setPoster({
                              ...poster,
                              images: poster.images.filter(
                                (img, i) => i !== index
                              ),
                            });
                          }}
                        >
                          <HiOutlineTrash
                            color="#2f89fc"
                            size="28px"
                            className={classes.slider_trash}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <div className={classes.slides_container}>
                  {poster?.images.map((slide, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSlider(index);
                          swiperInstance.slideTo(index);
                        }}
                      >
                        <Image
                          className={`${classes.small_slide_image} ${
                            index === slider && classes.active
                          }`}
                          src={slide}
                          width={70}
                          height={70}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={classes.buttons_container}>
                <button
                  className={classes.reject_button}
                  onClick={() => setShowDeletePopup(true)}
                >
                  رد آگهی{" "}
                </button>
                <button className={classes.accept_button}>تایید آگهی </button>
                <button className={classes.edit_button}>
                  ویرایش و تایید آگهی{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </MenuLayout>
  );
};

export default SinglePoster;
