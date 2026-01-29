<template>
  <ul class="listing" :class="{ 'listing--flex': flex }">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    flex: {
      type: Boolean,
      default: false,
    },
    full_width: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.listing {
  position: relative;
  overflow: hidden;

  .listing-single {
    display: block;
    width: 100%;
  }

  .listing-single.listing-single--featured {
    width: 100%;
  }

  .listing-single.active {
    .weather-summary-card__item.arrow::before {
      transform: scale(0.5) rotate(180deg);
    }
  }

  .listing-single--acordion {
    button {
      display: block;
      width: 100%;
    }
  }

  .listing-single--acordion:not(:first-child) {
    button {
      border-top: 2px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.listing--flex {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  .listing-single {
    position: relative;
    width: calc(100% / 3);
    transition: all 0.1s ease-in;

    button {
      width: 100%;
      padding: 20px 0px;
      border-radius: 8px;
    }

    button:hover {
      background-color: rgba(var(--bg-primary), 0.2);
    }

    @media only screen and (min-width: 768px) {
      width: calc(100% / 6);
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
    }
  }

  .listing-single:nth-child(2),
  .listing-single:nth-child(5) {
    border-left: 2px solid rgba(255, 255, 255, 0.2);
    border-right: 2px solid rgba(255, 255, 255, 0.2);

    @media only screen and (min-width: 768px) {
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
    }
  }

  .listing-single:not(:last-child) {
    border-bottom: none;

    @media only screen and (min-width: 768px) {
      border-right-color: rgba(255, 255, 255, 0.2);
    }
  }

  .listing-single:nth-child(-n + 3) {
    margin-bottom: 30px;

    @media only screen and (min-width: 768px) {
      margin-bottom: 0;
    }
  }

  .active {
    button {
      background-color: rgba(var(--bg-primary), 0.5);
    }
  }

  @media only screen and (min-width: 768px) {
    .listing-single:not(:first-child) {
      border-left-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
