import { useState, useEffect } from "react";
import blue_plus from "../assets/icons/blue-plus.png";
import AppSelect from "../components/AppSelect";
import eye from "../assets/icons/eye.png";
import x from "../assets/icons/x.png";
import calendar from "../assets/icons/calendar.png";
import red_trash from "../assets/icons/red-trash.png";
import AppInput from "../components/AppInput";
// import { toast } from "react-toastify";
import MenuLayout from "../Layout/MenuLayout";

import WarningPopup from "../components/popups/WarningPopup";

const perPagesOptions = [7, 10, 15, 20];
const users = [
  {
    id: 1,
    name: "محمدحسین رحیمی",
    username: "09030335008",
  },
];

const UsersList = () => {
  const [perPages, setPerPages] = useState(perPagesOptions[0]);

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [usersCount, setUsersCount] = useState(0);

  // Delete Popup
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const onDelete = async () => {
    try {
      const { data } = await deleteUser(deleteId);
      setDeletePopup(false);
      // toast.success("کاربر با موفقیت حذف شد");
    } catch (error) {
      toast.error("خطا در حذف کاربر" + error.message);
    }
  };
  //

  // const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    //  fetch and set users
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <MenuLayout>
      <WarningPopup
        title={"آیا از حذف این کاربر اطمینان دارید؟"}
        show={deletePopup}
        setShow={setDeletePopup}
        acceptClick={onDelete}
      />{" "}
      <div className="userslist-body">
        <div className="flex justify-between m-direction-col">
          {/* <AppSearch width="392px" /> */}
        </div>
        <div className="flex justify-between m-direction-col m-align-items-end t-direction-col">
          {" "}
          {/* <div className="flex align-center col-gap-9 z-index-12">
            {" "}
            <p className="font-size-16">وضعیت درخواست : </p>
            <AppSelect
              opts={statusOptions}
              value={status}
              setValue={setStatus}
              width="204px"
              zIndex={100}
            />
          </div> */}
          {/* <div className="flex col-gap-8 align-center">
            <p>جنسیت : </p>
            <div className="flex col-gap-2">
              <div
                onClick={() => {
                  setGender("مرد");
                }}
                className={`gender-option ${gender === "مرد" ? "active" : ""}`}
              >
                مرد
              </div>
              <div
                onClick={() => {
                  setGender("زن");
                }}
                className={`gender-option ${gender === "زن" ? "active" : ""}`}
              >
                زن
              </div>
            </div>
          </div> */}
          <div className="flex align-center col-gap-9 z-index-9">
            {" "}
            <p className="font-size-16">تعداد نمایش در صفحه : </p>
            <AppSelect
              opts={perPagesOptions}
              value={perPages}
              setValue={setPerPages}
              zIndex={100}
            />
          </div>
          <div className="flex align-center col-gap-9">
            {/* <p className="font-size-16">مرتب سازی : </p>
            <AppSelect
              opts={filterOptions}
              value={filter}
              setValue={setFilter}
              width="125px"
              icon={list}
              list
              additionalClass="height-fit-content"
            /> */}
          </div>
        </div>
        <div className="requests-body-table width-101">
          <table>
            <thead>
              <tr>
                <td>ردیف</td>
                <td>نام و نام خانوادگی</td>
                <td>شماره تلفن</td>
                <td>سطح دسترسی</td>
                <td>حذف کاربر</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr>
                    <td className="font-yekan">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.role === "مدیر" ? "مدیر" : "کاربر عادی"}</td>

                    <td>
                      <div className="requests-body-table-icon-container red">
                        <img
                          onClick={() => {
                            setDeleteId(user.id);
                            setDeletePopup(true);
                          }}
                          src={red_trash.src}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="requests-body-mobile-table">
            {users.map((user, index) => {
              return (
                <div className="requests-body-mobile-table-item">
                  <div className="requests-body-mobile-table-item-right font-yekan">
                    {index + 1}
                  </div>
                  <div className="requests-body-mobile-table-item-left">
                    <div className="flex justify-between align-center">
                      <h4 className="requests-body-mobile-table-item-left-name ">
                        نام و نام خانوادگی :
                      </h4>
                      <h4 className="requests-body-mobile-table-item-left-value">
                        {user.first_name} {user.last_name}
                      </h4>
                    </div>
                    <div className="flex justify-between align-center">
                      <h4 className="requests-body-mobile-table-item-left-name ">
                        کدملی :{" "}
                      </h4>
                      <h4 className="requests-body-mobile-table-item-left-value">
                        {user.code_melli}
                      </h4>
                    </div>
                    <div className="flex justify-between align-center">
                      <h4 className="requests-body-mobile-table-item-left-name ">
                        شماره تلفن :{" "}
                      </h4>
                      <h4 className="requests-body-mobile-table-item-left-value">
                        {user.username}
                      </h4>
                    </div>{" "}
                    <div className="flex justify-between align-center">
                      <h4 className="requests-body-mobile-table-item-left-name ">
                        {user.role === "مدیر" ? "مدیر" : "کاربر عادی"}
                      </h4>
                      <h4 className="requests-body-mobile-table-item-left-value"></h4>
                    </div>
                    <div className="requests-body-mobile-table-item-left-btns-container font-size">
                      <button
                        className="requests-body-mobile-table-item-left-btn newspage-header-button newspage-header-button-primary remove-pad"
                        onClick={() => {
                          setEditUser(user);
                        }}
                      >
                        مشاهده و ویرایش
                        <img
                          onClick={() => {
                            // toast.error("خطا در اتصال به بکند");
                          }}
                          src={eye.src}
                        />
                      </button>
                      <button
                        className="requests-body-mobile-table-item-left-btn newspage-header-button newspage-header-button-delete m-w-120 remove-pad"
                        onClick={() => {
                          setDeleteId(user.id);
                          setDeletePopup(true);
                        }}
                      >
                        حذف کاربر <img src={x.src} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MenuLayout>
  );
};

export default UsersList;
