import "./AnnouncementBar.css";

const AnnouncementBar = ({ text }) => {
  return (
    <div className="announcement-bar">
      <p>{text}</p>
    </div>
  );
};

export default AnnouncementBar;