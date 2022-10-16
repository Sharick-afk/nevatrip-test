document.addEventListener("DOMContentLoaded", function () {
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
});