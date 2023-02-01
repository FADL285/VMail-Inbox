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
