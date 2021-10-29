// 댓글 작성
const commtInput = document.querySelector(".comment");
const commentBox = document.querySelector(".comment-box");
const ul = document.querySelector(".comment-ul");
commentBox.appendChild(ul);

const commentSubmit = id => {
  axios
    .post("/post/comment/" + id, { comment: commtInput.value })
    .then(response => {
      const comment = response.data.comment;
      const userId = response.data.userId;
      const li = document.createElement("li");
      const idSpan = document.createElement("span");
      const commSpan = document.createElement("span");
      const dateSpan = document.createElement("span");

      ul.appendChild(li);
      li.appendChild(idSpan);
      li.appendChild(commSpan);
      li.appendChild(dateSpan);
      li.appendChild(deleteBtn);
      idSpan.innerText = userId;
      commSpan.innerText = comment;
      dateSpan.innerText = new Date().format("yyyy-MM-dd hh:mm:ss");
    })
    .catch(error => {
      console.log(error);
    });
  commtInput.value = "";
};
