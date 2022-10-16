document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".banners")) {
    var banners = document.querySelectorAll(".banner");
    banners.forEach(function (item) {
      bannerTimesWrapper = item.querySelector(".banner__times-wrapper"), bannerTimes = bannerTimesWrapper.querySelectorAll("div.banner__time"), bannerOverflowBtn = item.querySelector(".banner__more-button");

      if (bannerTimes.length >= 4) {
        bannerTimesWrapper.classList.add("hide-overflow");
      } else {
        bannerTimesWrapper.classList.remove("hide-overflow");
        bannerOverflowBtn.classList.add("hide");
      }

      bannerOverflowBtn.addEventListener("click", function (e) {
        e.target.closest(".banner__times-wrapper").classList.remove("hide-overflow");
        this.classList.add("hide");
      });
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".test2")) {
    var data = [{
      dir: "1",
      time: "18:00"
    }, {
      dir: "1",
      time: "18:30"
    }, {
      dir: "1",
      time: "18:45"
    }, {
      dir: "1",
      time: "19:00"
    }, {
      dir: "1",
      time: "19:15"
    }, {
      dir: "1",
      time: "21:00"
    }, {
      dir: "2",
      time: "18:30"
    }, {
      dir: "2",
      time: "18:45"
    }, {
      dir: "2",
      time: "19:00"
    }, {
      dir: "2",
      time: "19:15"
    }, {
      dir: "2",
      time: "19:35"
    }, {
      dir: "2",
      time: "21:50"
    }, {
      dir: "2",
      time: "21:55"
    }];
    var today = new Date(),
        timeZD = -today.getTimezoneOffset() / 60 - 3,
        timeSel = document.querySelector("#time"),
        dopTimeSel = document.querySelector("#time2"),
        dopTimeWrap = document.querySelector(".js-dop-block"),
        dirInput = document.querySelector("#direction"),
        result = document.querySelector(".js-result"),
        ticketNum = document.querySelector("#number"),
        dirArr = ["(из A в B)", "(из B в A)"]; // показываем только подходящие по направлению временные варианты

    var showAllowedTimes = function showAllowedTimes(direction) {
      timeSel.innerHTML = '';
      dopTimeSel.innerHTML = '';
      dopTimeWrap.classList.add("hide");
      data.forEach(function (item) {
        var dArr = item.time.split(":", 2);

        if (item.dir === direction) {
          timeSel.insertAdjacentHTML("beforeend", "\n      <option data-time='".concat(Number(dArr[0]) + timeZD + ":" + dArr[1], "'\n      value=\"").concat(Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(direction) - 1], "\"> ").concat(Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(direction) - 1], " </option>"));
        } else if (direction === "3") {
          if (item.dir === "1") {
            dopTimeWrap.classList.remove("hide");
            timeSel.insertAdjacentHTML("beforeend", "\n      <option data-time='".concat(Number(dArr[0]) + timeZD + ":" + dArr[1], "'\n      value=\"").concat(Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1], "\"> ").concat(Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1], " </option>"));
          } else if (item.dir === "2") {
            dopTimeSel.insertAdjacentHTML("beforeend", "\n      <option data-time='".concat(Number(dArr[0]) + timeZD + ":" + dArr[1], "'\n      value=\"").concat(Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1], "\"> ").concat(Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1], " </option>"));
          }
        }
      });
    };

    dirInput.addEventListener("click", function (e) {
      showAllowedTimes(dirInput.value);
    });
    dirInput.click(); // валидация кнопки

    var resultBtn = document.querySelector("#result-btn");
    resultBtn.disabled = true;

    var validate = function validate() {
      if (ticketNum.value) {
        resultBtn.disabled = false;

        if (!dopTimeWrap.classList.contains("hide")) {
          var fTime = Date.parse(new Date("2015-02-02T".concat(timeSel.querySelector("option:checked").getAttribute("data-time")))) / 60000,
              sTime = Date.parse(new Date("2015-02-02T".concat(dopTimeSel.querySelector("option:checked").getAttribute("data-time")))) / 60000;

          if (fTime + 50 > sTime) {
            document.querySelector(".error").classList.add("show");
            resultBtn.disabled = true;
          } else {
            document.querySelector(".error").classList.remove("show");
            resultBtn.disabled = false;
          }
        }
      } else {
        resultBtn.disabled = true;
      }
    };

    var wrapper = document.querySelector(".test2");
    wrapper.addEventListener("click", validate);
    wrapper.addEventListener("input", validate); // подсчет результата

    resultBtn.addEventListener("click", function (item) {
      addZero = function addZero(num) {
        if (num < 10) {
          return "0" + num;
        } else {
          return num;
        }
      };

      if (dirInput.value !== "3") {
        var fTime = Date.parse(new Date("2015-02-02T".concat(timeSel.querySelector("option:checked").getAttribute("data-time"))));
        var arriwedTime = new Date(fTime + 3000000),
            hours = addZero(arriwedTime.getHours()),
            minutes = addZero(arriwedTime.getMinutes());
        result.innerHTML = "\u0412\u044B \u043A\u0443\u043F\u0438\u043B\u0438 ".concat(ticketNum.value, " \u0431\u0438\u043B\u0435\u0442(\u0430) \u0432 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0438 ").concat(dirInput.querySelector("option:checked").innerHTML, "\n       \u0441\u0442\u043E\u0439\u043C\u043E\u0441\u0442\u044C\u044E ").concat(Number(ticketNum.value) * 700, "\n       \u0440\u0443\u0431\u043B\u0435\u0439.\u042D\u0442\u043E \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435 \u0437\u0430\u0439\u043C\u0435\u0442 \u0443 \u0432\u0430\u0441 50 \u043C\u0438\u043D\u0443\u0442.\u0422\u0435\u043F\u043B\u043E\u0445\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 ").concat(timeSel.querySelector("option:checked").getAttribute("data-time"), ", \u0430 \u043F\u0440\u0438\u0431\u0443\u0434\u0435\u0442 \u0432 ").concat(hours, ":").concat(minutes, ".\n       ");
      } else {
        var sTime = Date.parse(new Date("2015-02-02T".concat(dopTimeSel.querySelector("option:checked").getAttribute("data-time"))));

        var _arriwedTime = new Date(sTime + 3000000),
            _hours = addZero(_arriwedTime.getHours()),
            _minutes = addZero(_arriwedTime.getMinutes());

        result.innerHTML = "\u0412\u044B \u043A\u0443\u043F\u0438\u043B\u0438 ".concat(ticketNum.value, " \u0431\u0438\u043B\u0435\u0442(\u0430) \u0432 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0438 ").concat(dirInput.querySelector("option:checked").innerHTML, "\n       \u0441\u0442\u043E\u0439\u043C\u043E\u0441\u0442\u044C\u044E ").concat(Number(ticketNum.value) * 1200, "\n       \u0440\u0443\u0431\u043B\u0435\u0439.\u042D\u0442\u043E \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435 \u0437\u0430\u0439\u043C\u0435\u0442 \u0443 \u0432\u0430\u0441 100 \n       \u043C\u0438\u043D\u0443\u0442 \u0432 \u0441\u0443\u043C\u043C\u0435. \u0422\u0435\u043F\u043B\u043E\u0445\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 ").concat(timeSel.querySelector("option:checked").getAttribute("data-time"), ", \u0430 \u043F\u0440\u0438\u0432\u0435\u0437\u0435\u0442 \u0432\u0430\u0441 \u043E\u0431\u0440\u0430\u0442\u043D\u043E \u0432 ").concat(_hours, ":").concat(_minutes, ".\n       ");
      }
    });
  }
});