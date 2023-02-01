/**
 * Formats a date using Intl.DateTimeFormat and adds ordinal suffix to the day.
 *
 * @param {Date} date - The date to be formatted.
 * @param {string} [locale] - A string representing the locale to use for formatting. If omitted, the default locale is used.
 *
 * @returns {string} The formatted date as a string.
 *
 * @example
 * const date = new Date(2022, 4, 28);
 * const formattedDate = useFormatDate(date, "en-US"); // "May 28th, 2022"
 */
export default function useFormatDate(date, locale = undefined) {
  const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
  const SUFFIXES = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);

  const formatOrdinals = (n) => {
    const rule = pr.select(n);
    const suffix = SUFFIXES.get(rule);
    return `${n}${suffix}`;
  };

  const dateParts = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).formatToParts(date);

  return dateParts
    .map(({ type, value }) => {
      if (type === "day") return formatOrdinals(value);

      return value;
    })
    .join("");
}
