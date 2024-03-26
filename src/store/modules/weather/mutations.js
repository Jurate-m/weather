export default {
  setHourlyTimeStamp(state, payload) {
    state.hourlyTimeStmp = payload;
    sessionStorage.setItem("hourly_time_stmp", payload);
  },

  setDailyTimeStamp(state, payload) {
    state.dailyTimeStmp = payload;
    sessionStorage.setItem("daily_time_stmp", payload);
  },

  assignDailyWeather(state, payload) {
    state.dailyWeather = payload;
    sessionStorage.setItem("daily", JSON.stringify(payload));
  },

  separateDays(state, payload) {
    let dateIndex = new Date().getUTCDate();
    let day = [];
    let loopIndex = 0;

    payload.map((item) => {
      if (dateIndex == new Date(item.date).getUTCDate()) {
        day.push(item);
      } else {
        day = [];
        dateIndex = new Date(item.date).getUTCDate();
        loopIndex += 1;
        day.push(item);
      }

      state.hourlyWeather[loopIndex] = day;
    });

    sessionStorage.setItem("hourly", JSON.stringify(state.hourlyWeather));
  },
};
