/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import AppHeader from "../Layout/AppHeader";
import classes from "./posters.module.css";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import SmallPoster from "../components/SmallPoster";
import bicycle from "../assets/images/bicycle.png";
import { http } from "../http-services/http";

const MyPosters = () => {
  const [allPosters, setAllPosters] = useState([]);
  const { auth, setAuth } = useAuth();
  const fetchPosters = async () => {
    try {
      const { data } = await http.get(`/api/v1/users/authorize/`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setAllPosters(data.posters);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth)
      if (!auth.token && !auth.showLoginPopup)
        setAuth((prev) => ({ ...prev, showLoginPopup: true }));
    if (auth.token) {
      fetchPosters();
    }
  }, [auth]);
  return (
    <>
      <AppHeader />
      <div className={classes.my_posters_container}>
        <div className={classes.my_posters_title}>آگهی های من</div>
        <div className={classes.posters_container}>
          {allPosters.length === 0 && (
            <div
              style={{
                fontSize: "24px",
              }}
            >
              بدون آگهی
            </div>
          )}
          {allPosters &&
            allPosters.map((poster, index) => (
              <SmallPoster
                id={poster.id}
                key={index}
                image={
                  poster?.image.length > 0 ? poster?.image[0]?.url : bicycle.src
                }
                title={poster.title}
                location={poster.address[0].address_detail}
                description={poster?.description}
                categories={poster.tags}
                // time_description={poster.time_description}
                found={poster.status === "found"}
                lost={poster.status === "lost"}
                award={poster?.award}
                state={poster.state}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyPosters;
