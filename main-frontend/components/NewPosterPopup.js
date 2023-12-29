import classes from "./NewPosterPopup.module.css";
import PosterClasses from "../pages/posters.module.css";
import SearchableSelect from "./SearchableSelect";
import { useEffect, useRef, useState } from "react";
import { states } from "../data/province/Province";
import { BsMagic } from "react-icons/bs";
import { RxMagicWand } from "react-icons/rx";
import { HiOutlineSparkles } from "react-icons/hi2";
import Tehran from "../data/districts/Tehran.json";
import box from "../assets/images/box.svg";
import SearchableSelectTags from "./SearchableSelectTags";
import dynamic from "next/dynamic";
import { HiOutlinePhotograph, HiPlusCircle, HiTrash } from "react-icons/hi";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import ReactSwitch from "react-switch";
import Link from "next/link";
import { http } from "../http-services/http";
const MapWithNoSsrNewPoster = dynamic(
  () => import("../components/NewPosterMap"),
  {
    ssr: false,
  }
);
const initialValueOfPoster = {
  title: "",
  description: "",
  status: "lost",
};

const NewPosterPopup = () => {
  const [addresses, setAddresses] = useState([
    {
      address_detail: Tehran.districts[0],
      city: states[6],
      latitude: Tehran.districts[0].centroid.latitude,
      longitude: Tehran.districts[0].centroid.longitude,
      province: states[6],
    },
  ]);
  const [sendLoading, setSendLoading] = useState(false);
  const [poster, setPoster] = useState(initialValueOfPoster);
  const [award, setAward] = useState(false);
  const [specialPoster, setSpecialPoster] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [aiObjects, setAiObjects] = useState();
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [imagesToBackend, setImagesToBackend] = useState([]);
  const [images, setImages] = useState([]);
  const [activeImageforAi, setActiveImageForAi] = useState(0);
  const [loadingAi, setLoadingAi] = useState(false);
  const [userCredit, setUserCredits] = useState(0);

  const imageRef = useRef();
  const { auth, setAuth } = useAuth();

  useEffect(() => {}, [addresses]);

  useEffect(() => {
    (async () => {
      if (images.length > 0 && images[0]?.file) {
        images.forEach(async (image) => {
          if (image.isUploaded) return;
          const formData = new FormData();
          formData.append("image", image.file);
          const { data } = await axios.post(
            "/api/v1/api-call/image-upload",
            formData
          );
          setImagesToBackend([
            ...imagesToBackend,
            { id: image.file, url: data.url },
          ]);
          const updatedImages = [...images];
          updatedImages[
            updatedImages.findIndex((img) => img.file === image.file)
          ].isUploaded = true;
          setImages(updatedImages);
        });
      }
    })();
  }, [images]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await http.get("/api/v1/tags/");
        setAllTags(data);
        const { data: user } = await http.get("/api/v1/users/authorize/", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUserCredits(user.wallet);
      } catch (error) {
        toast.error("خطایی در دریافت دسته بندی رخ داده است");
      }
    })();
  }, []);
  const { districts } = Tehran;
  return (
    <div className={classes.container}>
      <div className={classes.body}>
        <h2 className={classes.header}>ثبت آگهی</h2>
        <div className={classes.image_container}>
          <div className={classes.image_title}>تصویر آگهی</div>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files[0]) {
                setImages([
                  ...images,
                  { file: e.target.files[0], isUploaded: false },
                ]);
              }
            }}
            ref={imageRef}
          />
          <div className={classes.images_container}>
            <div
              className={classes.add_image}
              onClick={() => imageRef.current.click()}
            >
              <img src={box.src} />
              <div className={classes.add_image_icon_container}>
                <HiOutlinePhotograph size={30} color="rgba(0,0,0,.48)" />
                <div className={classes.add_image_add_icon}>
                  <HiPlusCircle size={20} color="#2f89fc" />
                </div>
              </div>
            </div>
            {console.log(addresses)}
            {images.map((image, index) => {
              if (image?.file) {
                return (
                  <div
                    className={`${classes.image} ${
                      index === activeImageforAi ? classes.active : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setActiveImageForAi(index);
                    }}
                  >
                    <img
                      src={image?.file ? URL.createObjectURL(image.file) : ""}
                    />
                    <div className={classes.delete_image}>
                      <HiTrash
                        size={20}
                        color="#2f89fc"
                        onClick={() => {
                          setImages(
                            images.filter((img) => img.file !== image.file)
                          );
                          setImagesToBackend(
                            imagesToBackend.filter(
                              (img) => img.id !== image.file
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={classes.title_container}>
          <div className={classes.title}>عنوان آگهی</div>
          <div className={classes.ai_button_container}>
            <input
              className={classes.title_input}
              value={poster.title}
              onChange={(e) => {
                setPoster({ ...poster, title: e.target.value });
              }}
            />
            <button
              className={`${classes.ai_generate_button} ${
                imagesToBackend[activeImageforAi]
                  ? classes.active
                  : classes.disabled
              }`}
              disabled={!imagesToBackend[activeImageforAi]?.url}
              onClick={async () => {
                try {
                  setLoadingAi(true);
                  const { data } = await http.get(
                    `/api/v1/api-call/generate-poster-Info?image_url=${imagesToBackend[activeImageforAi].url}`
                  );
                  setAiObjects(data);
                  setLoadingAi(false);
                } catch (error) {
                  toast.error(
                    "خطایی در گرفتن اطلاعات پیش آمد ، لطفا از jpeg بودن فرمت تصویر خود اطمینان حاصل کنید"
                  );
                  setLoadingAi(false);
                }
              }}
            >
              {loadingAi ? (
                <Oval
                  height={24}
                  width={24}
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#2f89fc"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                <>
                  بهوش <HiOutlineSparkles />
                </>
              )}
            </button>
          </div>
          <div
            className={`${classes.title_ai_container} ${
              aiObjects && classes.show
            }`}
            style={{
              height: aiObjects
                ? aiObjects.titles.length === 0
                  ? "0px"
                  : "100px"
                : "0px",
              padding: aiObjects
                ? aiObjects.titles.length === 0
                  ? "0px"
                  : "10px"
                : "0px",
              border: aiObjects
                ? aiObjects.titles.length === 0
                  ? "0px"
                  : "1px solid rgba(0,0,0,.3)"
                : "0px",
            }}
          >
            {aiObjects &&
              aiObjects?.titles?.map((title, index) => (
                <div
                  key={index}
                  className={classes.title_ai_item}
                  onClick={() => {
                    setPoster({ ...poster, title });
                    setAiObjects({
                      ...aiObjects,
                      titles: aiObjects.titles.filter((t) => t !== title),
                    });
                  }}
                >
                  {title}
                </div>
              ))}
          </div>
        </div>
        <div className={classes.description_container}>
          <div className={classes.description}>توضیحات</div>
          <textarea
            className={classes.textarea}
            value={poster.description}
            onChange={(e) =>
              setPoster({ ...poster, description: e.target.value })
            }
          />
          <div
            className={`${classes.title_ai_container} ${
              aiObjects && classes.show
            }`}
            style={{
              height: aiObjects ? (!aiObjects.description ? 0 : 100) : 0,
              padding: aiObjects ? (!aiObjects.description ? 0 : 8) : 0,
              border: aiObjects
                ? !aiObjects.description
                  ? 0
                  : "1px solid rgba(0,0,0,.3)"
                : 0,
            }}
          >
            {aiObjects && (
              <div
                className={classes.title_ai_item}
                onClick={() => {
                  setPoster({ ...poster, description: aiObjects.description });
                  setAiObjects({ ...aiObjects, description: "" });
                }}
              >
                {aiObjects?.description}
              </div>
            )}
          </div>
        </div>
        <div className={classes.tags_container}>
          <div className={classes.tags}>برچسب ها</div>
          <SearchableSelectTags
            options={allTags}
            setAllTags={setAllTags}
            allTags={allTags}
            tags={tags}
            setTags={setTags}
            zindex={10000000}
          />
          <div
            className={`${classes.title_ai_container} ${
              aiObjects && classes.show
            }`}
            style={{
              height: aiObjects
                ? aiObjects.tags.length === 0
                  ? "0px"
                  : "100px"
                : "0px",
              padding: aiObjects
                ? aiObjects.tags.length === 0
                  ? "0px"
                  : "10px"
                : "0px",
              border: aiObjects
                ? aiObjects.tags.length === 0
                  ? "0px"
                  : "1px solid rgba(0,0,0,.3)"
                : "0px",
            }}
          >
            {aiObjects &&
              aiObjects?.tags?.map((tag, index) => (
                <div
                  key={index}
                  className={classes.title_ai_item}
                  onClick={() => {
                    setTags([...tags, { name: tag, id: -1 }]);
                    setAiObjects({
                      ...aiObjects,
                      tags: aiObjects.tags.filter((t) => t !== tag),
                    });
                  }}
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
        <div className={classes.title_container}>
          <div className={classes.title}>شماره تماس</div>
          <div className={classes.ai_button_container}>
            <input
              className={classes.title_input}
              style={{ width: "100%" }}
              value={poster.user_phone}
              onChange={(e) => {
                setPoster({ ...poster, user_phone: e.target.value });
              }}
            />
          </div>
        </div>{" "}
        <div className={classes.title_container}>
          <div className={classes.title}>ایدی تلگرام</div>
          <div className={classes.ai_button_container}>
            <input
              className={classes.title_input}
              style={{ width: "100%" }}
              value={poster.telegram_id}
              onChange={(e) => {
                setPoster({ ...poster, telegram_id: e.target.value });
              }}
            />
          </div>
        </div>
        <div
          className={PosterClasses.found_lost_container}
          style={{ justifyContent: "center", width: "100%" }}
        >
          <div
            className={`${PosterClasses.found_lost_item} ${
              poster.status === "lost" ? PosterClasses.active : ""
            }`}
            onClick={() => {
              setPoster({ ...poster, status: "lost" });
            }}
            style={{ width: "50%", textAlign: "center", padding: "8px" }}
          >
            گمشده
          </div>
          <div
            className={`${PosterClasses.found_lost_item} ${
              poster.status === "found" ? PosterClasses.active : ""
            }`}
            onClick={() => {
              setPoster({ ...poster, status: "found" });
            }}
            style={{ width: "50%", textAlign: "center", padding: "8px" }}
          >
            پیدا شده
          </div>
        </div>
        <div
          className={classes.award_container}
          style={{ fontSize: "20px", alignItems: "center" }}
        >
          {" "}
          مژدگانی
          <ReactSwitch
            onChange={(e) => setAward(e)}
            checked={award}
            onColor="#cdf0ea"
            color="#88888824"
            offColor="#e8e8e8"
            // onHandleColor="rgb(130 210 197)"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </div>
        <div className={classes.special_container}>
          {" "}
          <div className={classes.special_header_container}>
            <div className={classes.special_header}>اگهی ویژه</div>
            <ReactSwitch
              onChange={(e) => {
                if (userCredit >= 100000) {
                  setSpecialPoster(e);
                } else {
                  setShowHint(true);
                }
              }}
              checked={specialPoster}
              onColor="#cdf0ea"
              color="#88888824"
              offColor="#e8e8e8"
              // onHandleColor="rgb(130 210 197)"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
            />
            <div>100000 ریال</div>
            <div>| موجودی شما : </div>
            <div>{userCredit} ریال</div>
          </div>
          <div className={classes.special_description}>
            با فعال سازی این ویژگی ، آگهی شما به مدت یک هفته در بالای آگهی ها
            قرار خواهد گرفت و شانس بیشتری برای دیده شدن خواهد داشت.
          </div>
          {showHint && (
            <div className={classes.special_hint}>
              <div style={{ color: "#e74c3c" }}>موجودی شما کافی نیست </div>
              <Link
                href="/my-wallet"
                onClick={() =>
                  setAuth((prev) => ({ ...prev, showNewPosterPopup: false }))
                }
              >
                <button className={classes.go_to_wallet}>
                  رفتن به کیف پول{" "}
                </button>
              </Link>
            </div>
          )}
        </div>
        {addresses.map((address, index) => {
          return (
            <>
              <div className={classes.province_container}>
                <div className={classes.province}>استان</div>
                <SearchableSelect
                  options={states}
                  value={address.province}
                  setValue={(province) => {
                    const copyOfAddresses = [...addresses];
                    copyOfAddresses[index].province = province;
                    setAddresses(copyOfAddresses);
                  }}
                  zindex="1000000"
                />
              </div>
              <div className={classes.province_container}>
                <div className={classes.province}>محله</div>
                <SearchableSelect
                  options={districts}
                  value={address.address_detail}
                  setValue={(district) => {
                    const copyOfAddresses = [...addresses];
                    copyOfAddresses[index].address_detail = district;
                    setAddresses(copyOfAddresses);
                  }}
                />
              </div>
              <div className={classes.map}>
                <MapWithNoSsrNewPoster
                  lat={address.latitude}
                  lng={address.longitude}
                  district={address.address_detail}
                  setLatLong={({ lat, lng }) => {
                    setAddresses((lastAddresses) => {
                      const copyOfAddresses = [...lastAddresses];

                      copyOfAddresses[index].latitude = lat;
                      copyOfAddresses[index].longitude = lng;
                      return copyOfAddresses;
                    });
                  }}
                />
              </div>
            </>
          );
        })}
        <div
          className={classes.add_address_button}
          onClick={() => {
            setAddresses([
              ...addresses,
              {
                address_detail: Tehran.districts[0],
                city: states[6],
                latitude: Tehran.districts[0].centroid.latitude,
                longitude: Tehran.districts[0].centroid.longitude,
                province: states[6],
              },
            ]);
          }}
        >
          افزودن آدرس جدید
        </div>
        <div className={classes.buttons_container}>
          <div
            className={classes.cancel_button}
            onClick={() => {
              setAuth({ ...auth, showNewPosterPopup: false });
            }}
          >
            لغو
          </div>
          <div
            className={classes.submit_button}
            onClick={async () => {
              if (
                !poster.title ||
                !poster.description ||
                imagesToBackend.length === 0
              ) {
                toast.error("آگهی باید تصویر ، عنوان و توضیحات داشته باشد");
              } else {
                const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
                if (
                  poster?.user_phone?.length > 0 &&
                  !regex.test(poster.user_phone)
                ) {
                  toast.error("لطفا شماره تلفن معتبری وارد کنید");
                  return;
                }

                setSendLoading(true);
                try {
                  await http.post(
                    "/api/v1/posters/authorize/",
                    {
                      addresses: addresses.map((a) => ({
                        ...a,
                        address_detail: a.address_detail.name,
                        city: a.province.name,
                        province: a.province.name,
                      })),
                      img_urls: imagesToBackend.map((i) => i.url),
                      poster: {
                        alert: true,
                        award: award ? 1 : 0,
                        chat: true,
                        description: poster.description,
                        status: poster.status,
                        tel_id: poster.telegram_id,
                        title: poster.title,
                        special_type: specialPoster ? "premium" : "normal",
                        [poster?.user_phone ? "user_phone" : ""]:
                          poster.user_phone,
                      },
                      state: "pending",
                      tags: [
                        ...tags.map((tag) => {
                          return tag.name;
                        }),
                      ].filter((tag) => tag !== undefined),
                    },
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                  );
                  setAuth({
                    ...auth,
                    showNewPosterPopup: false,
                    refresh: true,
                  });
                  setSendLoading(false);
                  toast.success(
                    "آگهی شما با موفقیت ارسال شد و پس از تایید نمایش داده خواهد شد"
                  );
                } catch (error) {
                  toast.error("خطایی پیش آمده است");
                }
              }
            }}
          >
            {sendLoading ? (
              <Oval
                height={24}
                width={24}
                color="white"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#2f89fc"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              "ثبت"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPosterPopup;
