import { reactive } from "vue";

const emails = reactive(new Set());
export default function useEmailSelection() {
  const toggle = (email) => {
    if (emails.has(email)) emails.delete(email);
    else emails.add(email);
  };
  const clear = () => {
    emails.clear();
  };
  const addMultiple = (mails) => {
    mails.forEach((mail) => {
      emails.add(mail);
    });
  };

  return {
    emails,
    toggle,
    clear,
    addMultiple,
  };
}
