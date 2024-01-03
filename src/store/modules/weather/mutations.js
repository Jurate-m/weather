export default {
  transformDataDates(state, payload) {
    if (!payload.length) return;

    state.hourlyWeather = payload.map((item) => {
      return { ...item, date: new Date(item.date) };
    });

    return state.hourlyWeather;
  },

  separateDataByDay(state, payload) {
    let currentDay = new Date().getDate();
    let day = [];
    let dayIndex = 0;

    payload.forEach((item) => {
      if (currentDay == item.date.getDate()) {
        day.push(item);
        state.days[dayIndex] = day;
      } else {
        day = [];
        dayIndex += 1;
        currentDay = item.date.getDate();
        return;
      }
    });

    return state.days;
  },
};
