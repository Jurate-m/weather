<template>
  <div class="card" :class="classes">
    <div class="card__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },

    pb: {
      type: Boolean,
      default: false,
    },

    pt: {
      type: Boolean,
      default: false,
    },

    padded: {
      type: Boolean,
      default: false,
    },

    bordered: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "card--transparent": this.transparent,
        pb: this.pb,
        pt: this.pt,
        "card--padded": this.padded,
        "card--border": this.bordered,
      };
    },
  },
};
</script>

<style>
.card .card {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.card.pb {
  padding-bottom: 40px;
}

.card.pt {
  padding-top: 40px;
}

.card__inner {
  background-color: rgba(var(--bg-primary), 0.1);
  border-radius: 12px;
}

.card--transparent {
  .card__inner {
    background-color: transparent;
  }
}

.card--padded {
  .card__inner {
    padding: 40px 20px;
  }
}

.card--border {
  .card__inner {
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
