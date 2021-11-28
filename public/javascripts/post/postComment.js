// 댓글 작성
const commentBox = document.querySelector(".comment-box");
const commtInput = document.querySelector(".comment");
const div = document.querySelector(".comment-content");
const ul = document.querySelector(".comment-ul");

const commentSubmit = id => {
  axios
    .post("/post/comment/" + id, { comment: commtInput.value })
    .then(response => {
      const comment = response.data.comment;
      const userId = response.data.userId;
      const li = document.createElement("li");
      const infoDiv = document.createElement("div");
      const idSpan = document.createElement("span");
      const dateSpan = document.createElement("span");
      const commSpan = document.createElement("span");
      const delBtn = document.createElement("button");
      const updateBtn = document.createElement("button");
      li.classList.add("comment-list");
      infoDiv.classList.add("comm-info");
      idSpan.classList.add("comm-userId");
      dateSpan.classList.add("comm-time");
      commSpan.classList.add("comm-comment");
      delBtn.classList.add("comm-delBtn");
      updateBtn.classList.add("comm-updateBtn");
      div.appendChild(ul);
      ul.appendChild(li);
      li.appendChild(infoDiv);
      infoDiv.appendChild(idSpan);
      infoDiv.appendChild(dateSpan);
      li.appendChild(commSpan);
      infoDiv.appendChild(delBtn);
      infoDiv.appendChild(updateBtn);
      idSpan.innerText = userId;
      delBtn.innerText = "삭제";
      updateBtn.innerText = "수정";
      // dateSpan.innerText = new Date().format("yyyy-MM-dd hh:mm:ss");
      commSpan.innerText = comment;
    })
    .catch(error => {
      console.log(error);
    });
  commtInput.value = "";
};
