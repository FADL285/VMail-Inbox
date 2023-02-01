export default function useRelativeDate(date, locale = undefined) {
  const getRelativeTime = (date, locale) => {
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const DIVISIONS = [
      { amount: 60, unit: "second" },
      { amount: 60, unit: "minute" },
      { amount: 24, unit: "hour" },
      { amount: 7, unit: "day" },
      { amount: 4.34524, unit: "week" },
      { amount: 12, unit: "month" },
      { amount: Number.POSITIVE_INFINITY, unit: "year" },
    ];

    let duration = (date - new Date()) / 1000;
    for (const division of DIVISIONS) {
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.unit);
      }
      duration /= division.amount;
    }
  };

  return getRelativeTime(date, locale);
}
