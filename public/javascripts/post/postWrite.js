const title = document.querySelector(".title");
const hashtag = document.querySelector(".hashtag");
const mainTxt = document.querySelector(".text");

// 새 글 작성
const postWrite = () => {
  if (title.value === "" || mainTxt.value === "") {
    alert("제목과 내용을 확인해 주세요");
  }
  // if (title.value === "" || mainTxt.value === "") {
  //   alert("제목과 내용을 확인해 주세요");
  // } else {
  //   axios.post(
  //     "/post/postWrite_process",
  //     {
  //       title: title.value,
  //       hashtag: hashtag.value,
  //       mainTxt: mainTxt.value,
  //     }
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       })
  //   );
  // }
};
