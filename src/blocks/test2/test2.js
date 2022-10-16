document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".test2")) {

    const data = [{
        dir: "1",
        time: "18:00",
      },
      {
        dir: "1",
        time: "18:30",
      },
      {
        dir: "1",
        time: "18:45",
      },
      {
        dir: "1",
        time: "19:00",
      },
      {
        dir: "1",
        time: "19:15",
      },
      {
        dir: "1",
        time: "21:00",
      },
      {
        dir: "2",
        time: "18:30",
      },
      {
        dir: "2",
        time: "18:45",
      },
      {
        dir: "2",
        time: "19:00",
      },
      {
        dir: "2",
        time: "19:15",
      },
      {
        dir: "2",
        time: "19:35",
      },
      {
        dir: "2",
        time: "21:50",
      },
      {
        dir: "2",
        time: "21:55",
      },
    ];
    const today = new Date(),
      timeZD = -today.getTimezoneOffset() / 60 - 3,
      timeSel = document.querySelector("#time"),
      dopTimeSel = document.querySelector("#time2"),
      dopTimeWrap = document.querySelector(".js-dop-block"),
      dirInput = document.querySelector("#direction"),
      result = document.querySelector(".js-result"),
      ticketNum = document.querySelector("#number"),
      dirArr = ["(из A в B)",
        "(из B в A)"
      ];

    // показываем только подходящие по направлению временные варианты
    const showAllowedTimes = function (direction) {
      timeSel.innerHTML = '';
      dopTimeSel.innerHTML = '';
      dopTimeWrap.classList.add("hide");
      data.forEach(function (item) {
        let dArr = item.time.split(":", 2);

        if (item.dir === direction) {
          timeSel.insertAdjacentHTML(
            "beforeend", `
      <option data-time='${Number(dArr[0]) + timeZD + ":" + dArr[1]}'
      value="${
        Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(direction) - 1]
      }"> ${
       Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(direction) - 1]
      } </option>`
          );


        } else if (direction === "3") {
          if (item.dir === "1") {
            dopTimeWrap.classList.remove("hide");
            timeSel.insertAdjacentHTML(
              "beforeend", `
      <option data-time='${ Number(dArr[0]) + timeZD + ":" + dArr[1]}'
      value="${
        Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1]
      }"> ${
       Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1]
      } </option>`
            );
          } else
          if (item.dir === "2") {

            dopTimeSel.insertAdjacentHTML(
              "beforeend", `
      <option data-time='${ Number(dArr[0]) + timeZD + ":" + dArr[1]}'
      value="${
        Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1]
      }"> ${
       Number(dArr[0]) + timeZD + ":" + dArr[1] + dirArr[Number(item.dir) - 1]
      } </option>`
            );
          }
        }

      });
    }

    dirInput.addEventListener("click", function (e) {
      showAllowedTimes(dirInput.value)
    })
    dirInput.click();

    // валидация кнопки
    const resultBtn = document.querySelector("#result-btn");
    resultBtn.disabled = true;
    const validate = function () {


      if (ticketNum.value) {
        resultBtn.disabled = false;
        if (!dopTimeWrap.classList.contains("hide")) {
          let fTime = Date.parse(new Date(`2015-02-02T${timeSel.querySelector("option:checked").getAttribute("data-time")}`)) / 60000,
            sTime = Date.parse(new Date(`2015-02-02T${dopTimeSel.querySelector("option:checked").getAttribute("data-time")}`)) / 60000;

          if (fTime + 50 > sTime) {
            document.querySelector(".error").classList.add("show")
            resultBtn.disabled = true;
          } else {
            document.querySelector(".error").classList.remove("show")
            resultBtn.disabled = false;
          }
        }
      } else {
        resultBtn.disabled = true;
      }
    };


    let wrapper = document.querySelector(".test2");
    wrapper.addEventListener("click", validate);
    wrapper.addEventListener("input", validate);

    // подсчет результата
    resultBtn.addEventListener("click", function (item) {
      addZero = function (num) {
        if (num < 10) {
          return "0" + num
        } else {
          return num
        }
      }
      if (dirInput.value !== "3") {
        let fTime = Date.parse(new Date(`2015-02-02T${timeSel.querySelector("option:checked").getAttribute("data-time")}`));
        let arriwedTime =
          new Date(fTime + 3000000),
          hours = addZero(arriwedTime.getHours()),
          minutes = addZero(arriwedTime.getMinutes());
        result.innerHTML = `Вы купили ${ticketNum.value} билет(а) в направлении ${dirInput.querySelector("option:checked").innerHTML}
       стоймостью ${
         Number(ticketNum.value) * 700
       }
       рублей.Это путешествие займет у вас 50 минут.Теплоход отправляется в ${
         timeSel.querySelector("option:checked").getAttribute("data-time")
       }, а прибудет в ${hours}:${minutes}.
       `
      } else {

        let sTime = Date.parse(new Date(`2015-02-02T${dopTimeSel.querySelector("option:checked").getAttribute("data-time")}`));
        let arriwedTime =
          new Date(sTime + 3000000),
          hours = addZero(arriwedTime.getHours()),
          minutes = addZero(arriwedTime.getMinutes());


        result.innerHTML = `Вы купили ${ticketNum.value} билет(а) в направлении ${dirInput.querySelector("option:checked").innerHTML}
       стоймостью ${Number(ticketNum.value) * 1200}
       рублей.Это путешествие займет у вас 100 
       минут в сумме. Теплоход отправляется в ${
         timeSel.querySelector("option:checked").getAttribute("data-time")
       }, а привезет вас обратно в ${hours}:${minutes}.
       `
      }
    });

  }



});