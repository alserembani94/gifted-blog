import { DateTime } from "luxon";

export const displayRelativeTime = (date: string) => {
  const now = DateTime.now();
  const publishedOn = DateTime.fromISO(date);
  const diff = now
    .diff(publishedOn, ["years", "months", "days", "hours"])
    .toObject();

  if (diff.years) {
    return new Intl.RelativeTimeFormat("en").format(-diff.years, "years");
  } else if (diff.months) {
    return new Intl.RelativeTimeFormat("en").format(-diff.months, "months");
  } else if (diff.days) {
    return new Intl.RelativeTimeFormat("en").format(-diff.days, "days");
  } else if (diff.hours) {
    return new Intl.RelativeTimeFormat("en").format(-diff.hours, "hours");
  } else {
    return "Just now";
  }
};
