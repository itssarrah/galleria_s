import { FaHeart } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import IconList from "../ui/IconList";
import "../../css/business.css"

const BusinessProfileStats = ({ date, likes = 0, sales = 0 }) => {
  const { t } = useTranslation();
  const dateOptions = { month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString(t("tz"), dateOptions);

  const nFormat = Intl.NumberFormat();

  const stats = [
    `Member since ${formattedDate}`,
    nFormat.format(likes),
    nFormat.format(sales),
  ];

  return (
    <div className="business-profile-stats mx-auto">
      <IconList
        items={stats}
        className="text-[#FF9494] text-xl flex flex-row gap-10 w-fit m-auto"
      >
        <CiCalendar />
        <FaHeart />
        <IoPricetagsOutline />
      </IconList>
    </div>
  );
};

export default BusinessProfileStats;
