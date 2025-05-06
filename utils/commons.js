// 클립보드 복사
export const copyText = (text, target) => {
  const board = navigator.clipboard;
  board
    .writeText(text)
    .then(() => {
      window.alert(`${target ? `${target} ` : ""}` + "클립보드에 복사되었습니다.");
    })
    .catch((error) => {
      window.toast(error);
    });
};

// 이미지 리사이즈
export const resize = {
  init: function (outputQuality) {
    this.outputQuality = outputQuality === "undefined" ? 1 : outputQuality;
  },

  photo: function (standard, file, maxSize, outputType, callback) {
    var _this = this;
    const reader = new FileReader();
    reader.onload = function (readerEvent) {
      if (standard === "h") {
        _this.resizeWidth(readerEvent.target.result, maxSize, outputType, callback);
      } else if (standard === "w") {
        _this.resizeHeight(readerEvent.target.result, maxSize, outputType, callback);
      }
    };
    reader.readAsDataURL(file);
  },
  // 가로 폭을 resize함
  resizeWidth: function (dataURL, maxSize, outputType, callback) {
    const _this = this;
    const image = new Image();
    image.onload = function (imageEvent) {
      // 이미지를 onload할 때 resize 함
      const canvas = document.createElement("canvas"); //const가 안되길래 let으로 바꿨음
      let width = image.width;
      let height = image.height;

      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      _this.output(canvas, outputType, callback);
    };
    image.src = dataURL;
  },
  // 세로 높이를 resize함
  resizeHeight: function (dataURL, maxSize, outputType, callback) {
    const _this = this;
    const image = new Image();
    image.onload = function (imageEvent) {
      const canvas = document.createElement("canvas");
      let width = image.width;
      let height = image.height;

      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      _this.output(canvas, outputType, callback);
    };
    image.src = dataURL;
  },
  output: function (canvas, outputType, callback) {
    switch (outputType) {
      case "object":
        canvas.toBlob(
          function (blob) {
            const obj = {
              blob: blob,
              url: canvas.toDataURL("image/png", 1),
            };
            callback(obj);
          },
          "image/png",
          1
        );
        break;

      case "file":
        canvas.toBlob(
          function () {
            callback(blob);
          },
          "image/png",
          1
        );
        break;

      case "dataURL":
        callback(canvas.toDataURL("image/png", 1));
        break;
    }
  },
};

// 해시 생성
// export const createHash = () => {
//   const timestamp = new Date().getTime();
//   let hashString = "";
//   const hashChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   while (hashString.length < 7) {
//     hashString += hashChars.charAt(Math.floor(Math.random() * hashChars.length));
//   }
//   return timestamp.toString() + hashString;
// };

// pin 상태인지 표시
export const isPinned = (date) => {
  const value = new Date(date);
  // const val = value.setHours(value.getHours() + 9);
  const time = new Date(value).getTime();
  const now = new Date().getTime();
  const gap = (now - time) / (1000 * 60);
  return !!(gap > 0);
};

// 시간 생성
export const getTimestamp = (date) => {
  const value = new Date(date);
  // const val = value.setHours(value.getHours() + 9);
  const time = new Date(value).getTime();
  const now = new Date().getTime();
  const gap = (now - time) / (1000 * 60);

  if (gap < 1) {
    return "지금";
  }
  if (gap < 2) {
    return "1분 전";
  }
  if (gap < 3) {
    return "3분 전";
  }
  if (gap < 5) {
    return `5분 전`;
  } else if (gap > 5 && gap < 30) {
    return `30분 전`;
  } else if (gap > 60 && gap < 120) {
    // 60~120분 전
    return `1시간 이내`;
  } else if (gap > 120 && gap < 180) {
    // 120~180분 전
    return `3시간 이내`;
  } else if (gap > 180 && gap < 1440) {
    // 180분 ~ 24시간 전
    return `오늘`;
  } else if (gap > 1440 && gap < 2880) {
    // 24시간 ~ 48시간 전
    return `하루 전`;
  } else if (gap > 2880 && gap < 8640) {
    // 48시간 ~ 48시간 전
    return `2일 전`;
  } else if (gap > 8640 && gap < 20160) {
    // 48시간 ~ 6일 전
    return `이번 주`;
  } else {
    return value.toLocaleDateString();
  }
};
