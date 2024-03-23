export default {
  beforeMount: (el, binding) => {
    el.handler = (e) => {
      if (!(el === e.target || el.contains(e.target))) {
        return binding.value(e);
      }
    };

    document.addEventListener("click", el.handler);
  },
  unmounted(el) {
    document.removeEventListener("click", el.handler);
  },
};
