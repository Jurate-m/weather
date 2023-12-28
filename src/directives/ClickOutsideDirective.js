export default {
  beforeMount: (el, binding) => {
    console.log(el);
    console.log(binding);

    el.eventHandler = function (e) {
      if (!(el === e.target || el.contains(e.target))) {
        binding.value(e);
      }
    };

    document.addEventListener("click", el.eventHandler);
  },
  unmounted(el) {
    document.removeEventListener("click", el.eventHandler);
  },
};
