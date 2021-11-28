// 좋아요
const like = id => {
  axios
    .post("/post/like/" + id)
    .then(function (response) {
      const likeElement = document.querySelector(`#post-id-${id} i`);
      const likeCntEle = document.querySelector(`#post-id-${id} .like-cnt`);
      let cnt = Number(likeCntEle.innerText);
      likeElement.classList.remove("far");
      likeElement.classList.remove("fas");
      likeElement.classList.add(response.data.like_state ? "fas" : "far");
      likeCntEle.innerText = response.data.like_state ? cnt + 1 : cnt - 1;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// 인기순
const popularity = () => {
  // axios
  //   .get("/post/popularity")
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};

// 최신순
const recent = () => {};
