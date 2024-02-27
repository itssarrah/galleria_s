const formatRelativeDate = (inputDate) => {
  const currentDate = new Date();
  const reviewDate = new Date(inputDate);
  const timeDifference = currentDate - reviewDate;
  const secondsDifference = timeDifference / 1000;
  const minutesDifference = secondsDifference / 60;
  const hoursDifference = minutesDifference / 60;
  const daysDifference = hoursDifference / 24;

  if (secondsDifference < 60) {
    return "Just now";
  } else if (minutesDifference < 60) {
    return `${Math.floor(minutesDifference)} minutes ago`;
  } else if (hoursDifference < 24) {
    return `${Math.floor(hoursDifference)} hours ago`;
  } else if (daysDifference < 7) {
    const daysAgo = Math.floor(daysDifference);
    return daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`;
  } else {
    return reviewDate.toLocaleDateString();
  }
};

export default formatRelativeDate;
