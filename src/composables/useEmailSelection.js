import { reactive } from "vue";
import axios from "axios";

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

  const forSelected = async (callback) => {
    for (const email of emails) {
      callback(email);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/emails/${email.id}`,
        email
      );
    }
  };
  const markAsRead = () => forSelected((email) => (email.read = true));
  const markAsUnread = () => forSelected((email) => (email.read = false));
  const archive = () =>
    forSelected((email) => (email.archived = true)).then(() => clear());

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markAsRead,
    markAsUnread,
    archive,
  };
}
