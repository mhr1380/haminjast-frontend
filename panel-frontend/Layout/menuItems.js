import message_text from "../assets/icons/message-text.svg";
import message_select from "../assets/icons/message-text-select.svg";
import profile from "../assets/icons/profile.svg";
import profile_blue from "../assets/icons/profile-blue.svg";
import gallery from "../assets/icons/gallery.svg";
import music_library from "../assets/icons/music-library.png";
import messageText from "../assets/icons/message-text.png";
import messageText_select from "../assets/icons/message-text-select.png";
const MenuItems = [
  {
    id: 1,
    title: "آگهی ها",
    link: "/posters",
    icon: music_library,
    select_icon: messageText_select,
    open: false,
    children: [],
    is_superuser: true,
  },

  {
    id: 2,
    title: "کاربران",
    link: "/users",
    icon: profile,
    select_icon: profile_blue,
    open: false,
    children: [],
    is_superuser: true,
  },

  {
    id: 3,
    title: "انتقادات و شکایات",
    link: "/criticism",
    icon: messageText,
    select_icon: messageText_select,
    open: false,
    children: [],
    is_superuser: true,
  },
  {
    id: 4,
    title: "گزارشات",
    link: "/reports",
    icon: message_text,
    select_icon: message_select,
    open: false,
    children: [],
  },
];

export default MenuItems;
