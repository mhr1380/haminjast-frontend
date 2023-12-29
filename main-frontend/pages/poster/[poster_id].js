/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import AppHeader from "../../Layout/AppHeader";
import Image from "next/image";
import classes from "./poster.module.css";
import dynamic from "next/dynamic";
import bicycle from "../../assets/images/bicycle.png";
import bic from "../../assets/images/bic.webp";
import { HiOutlineBookmark, HiOutlineShare } from "react-icons/hi";
import { MdOutlineReport } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import axios from "axios";
import Popup from "../../components/Popup";
import ReportPopup from "../../components/ReportPopup";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { http } from "../../http-services/http";
let swiperInstance = null;

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
  ssr: false,
});
const Poster = () => {
  const [latLong, setLatLong] = [35.742473999999994001, 51.502310300000005001];
  const [slider, setSlider] = useState(0);
  const [slides, setSlides] = useState([bicycle, bic]);
  const [showContactDetail, setShowContactDetail] = useState(false);

  const { auth, setAuth } = useAuth();

  const [showReportPoster, setShowReportPoster] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);

  const [poster, setPoster] = useState({
    title: "",
    description: "",
    addresses: [],
  });
  const router = useRouter();

  const checkLatLong = () => {
    if (poster?.addresses.length > 0) {
      if (poster.addresses[0].latitude && poster.addresses[0].longitude) {
        return [poster.addresses[0].latitude, poster.addresses[0].longitude];
      } else {
        return latLong;
      }
    } else {
      return latLong;
    }
  };
  useEffect(() => {
    if (router.query.poster_id && !poster?.title) {
      fetchPoster();
    }
  }, [router.query.poster_id]);

  const fetchPoster = async () => {
    const { data } = await axios.get(
      `/api/v1/posters/${router.query.poster_id}`
    );
    console.log(data);
    setPoster(data);
  };
  return (
    <>
      {showContactDetail && (
        <Popup
          phone={poster?.user_phone}
          telegram_id={poster?.telegram_id}
          setShow={setShowContactDetail}
        />
      )}
      {showReportPoster && (
        <ReportPopup setShow={setShowReportPoster} posterId={poster.id} />
      )}
      {/* {showShareButtons && <SharePopup setShow={setShowShareButtons} />} */}
      <AppHeader />
      <div className={classes.container}>
        <div className={classes.poster_container}>
          <div className={classes.details_container}>
            <h2>{poster.title}</h2>
            {poster?.status === "lost" ? (
              <p>
                <span className={classes.lost}> گم شده </span>
                در{" "}
                <b>
                  {poster?.addresses.length > 0
                    ? poster.addresses[0].address_detail
                    : ""}
                </b>
              </p>
            ) : (
              <p>
                {"3 دقیقه پیش" + " "}
                <span className={classes.found}> پیدا شده </span>
                در{" "}
                <b>
                  {" "}
                  {poster?.addresses.length > 0
                    ? poster.addresses[0].address_detail
                    : ""}
                </b>
              </p>
            )}

            <div className={classes.poster_cta_container}>
              <div className={classes.poster_cta_buttons}>
                {poster?.user_phone || poster.telegram_id ? (
                  <button
                    className={classes.contact}
                    onClick={() => setShowContactDetail(true)}
                  >
                    اطلاعات تماس
                  </button>
                ) : (
                  ""
                )}
                <button
                  className={classes.chat}
                  onClick={async () => {
                    if (auth?.token) {
                      try {
                        const { data } = await http.post(
                          "/api/v1/chat/authorize/conversation",
                          {
                            name: poster.title,
                            poster_id: poster.id,
                          },
                          { headers: { Authorization: `Bearer ${auth.token}` } }
                        );
                        router.push(`/chat/${data.conversation.id}`);
                      } catch (error) {
                        if (error.response.data.error.includes("yourself")) {
                          toast.error(
                            "شما نمی توانید با خودتان چتی را آغاز کنید!"
                          );
                        } else {
                          toast.error("خطایی پیش آمده است ");
                        }
                      }
                    } else {
                      toast.error("برای آغاز چت باید به حساب خود وارد شوید");
                    }
                  }}
                >
                  چت
                </button>
              </div>

              <div className={classes.poster_cta_share}>
                <div
                  className={classes.share_button}
                  onClick={() => {
                    if (auth?.token) {
                      setShowReportPoster(true);
                    } else {
                      toast.error("برای ثبت گزارش باید به حساب خود وارد شوید");
                    }
                  }}
                >
                  <MdOutlineReport size="24px" />
                </div>
                <div
                  className={classes.share_button}
                  onClick={async () => {
                    const data = await navigator.share({
                      title: `${poster.title}`,
                      text: `${poster.description}}`,
                      url: `https://localhost:3000/poster/${poster.id}`,
                    });
                    console.log("fuck");
                    console.log(data);
                  }}
                >
                  <HiOutlineShare size="20px" />
                </div>
              </div>
            </div>
            <div className={classes.poster_description}>
              <h3>توضیحات</h3> {poster?.description}
            </div>
            <div className={classes.badges_container}>
              {poster?.tags?.map((cat) => {
                return (
                  <div
                    key={cat.name}
                    className={`${classes.badge} ${classes.category}`}
                  >
                    {cat.name}
                  </div>
                );
              })}
              {poster.award > 0 ? (
                <div className={`${classes.badge} ${classes.reward}`}>
                  مژدگانی{" "}
                </div>
              ) : (
                ""
              )}{" "}
              {poster.special_type === "premium" ? (
                <div className={`${classes.badge} ${classes.emergency}`}>
                  ویژه{" "}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={classes.map_in_mobile}>
              موقعیت
              {poster.addresses.length > 0 && poster.addresses[0].latitude && (
                <MapWithNoSSR
                  noDrawCircle={true}
                  firstCircle={true}
                  latLong={{ lat: checkLatLong()[0], lng: checkLatLong()[1] }}
                />
              )}
            </div>
            {/* <div className={classes.report_container}></div> */}
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
                {poster?.images?.map((slide, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        className={classes.slide_image}
                        src={slide.url}
                        width={500}
                        height={360}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className={classes.slides_container}>
                {poster?.images?.map((slide, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSlider(index);
                        swiperInstance.slideTo(index);
                      }}
                    >
                      <img
                        className={`${classes.small_slide_image} ${
                          index === slider && classes.active
                        }`}
                        src={slide.url}
                        width={70}
                        height={70}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.map_container}>
          موقعیت
          {poster.addresses.length > 0 && poster.addresses[0].latitude && (
            <MapWithNoSSR
              noDrawCircle={true}
              firstCircle={true}
              height={"300px"}
              latLong={{ lat: checkLatLong()[0], lng: checkLatLong()[1] }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Poster;
