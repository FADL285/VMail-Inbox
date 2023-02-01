import { onMounted, onBeforeUnmount } from "vue";

/**
 * A custom composable that listens for keydown events and triggers the associated function when the key combination is pressed.
 *
 * @param {{key: String, fn: Function}[]} keyCombos - Array of key combo
 * @param {String} keyCombos[].key - Key to listen for
 * @param {Function} keyCombos[].fn - Function to call when key is pressed
 *
 *  @example
 * const keyCombos = [
 *   { key: "ArrowUp", fn: () => console.log("ArrowUp pressed") },
 *   { key: "ArrowDown", fn: () => console.log("ArrowDown pressed") },
 * ];
 * useKeyDown(keyCombos);
 */
export default function useKeyDown(keyCombos) {
  const onKeyDown = (event) => {
    const kc = keyCombos.find((kc) => kc.key === event.key);
    if (kc) {
      kc.fn();
    }
  };

  onMounted(() => window.addEventListener("keydown", onKeyDown));
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
  });
}
