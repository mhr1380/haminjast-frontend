import classes from "../pages/chat/Chat.module.css";
import bicycle from "../assets/images/bicycle.png";
const ChatItem = ({ description, name, onClick, active, image, unread }) => {
  return (
    <div
      className={`${classes.chatslist_chat_item} ${
        active ? classes.active : ""
      }`}
      onClick={() => {
        onClick();
      }}
    >
      <div className={classes.chatslist_chat_item_icon}>
        <img src={image ? image : bicycle.src} />
      </div>
      <div className={classes.chatslist_chat_item_info}>
        <div className={classes.chatslist_chat_item_info_top}>{name} </div>
        <div className={classes.chatslist_chat_item_info_down}>
          {" "}
          {description.length > 32
            ? description.slice(0, 32) + "..."
            : description}
        </div>
      </div>
      <div
        className={`${classes.chatslist_chat_item_notification} ${
          unread && classes.active
        }`}
      ></div>
    </div>
  );
};

export default ChatItem;
