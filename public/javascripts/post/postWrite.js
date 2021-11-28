window.onload = () => {
  const hashtag = document.querySelector(".hashtag");
  const tagList = document.querySelector(".tag-list");

  title.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  tagArr = [];
  hashtag.addEventListener("keydown", e => {
    if (e.key === "Enter" && tagArr.length !== 3) {
      e.preventDefault();
      const li = document.createElement("li");
      li.classList.add("tagValue");
      li.innerText = hashtag.value;
      tagList.appendChild(li);
      tagArr.push(hashtag.value);
      hashtag.value = "";
    } else if (e.key === "Enter" || tagArr.length === 3) {
      alert("태그는 3개만 입력가능합니다.");
      hashtag.value = "";
      e.preventDefault();
    }
  });
};

const title = document.querySelector(".title");
const text = document.querySelector(".text");
const liTest = document.querySelector(".tagValue");
const tagSubmit = () => {
  const form = new FormData(document.getElementById("post-write-form"));

  // tags = tagValue();
  // tags.forEach((tag, index) => {
  //   form.append("tag[" + index + "]", tag);
  //   test = form.get("tag[" + index + "]");
  //   console.log(form.get("tag[" + index + "]"));
  // });

  // axios
  //   .post("/post/postWrite_process", {
  //     title: title.value,
  //     tagPost: tags,
  //     text: text.value,
  //   })
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};

// const submitPost = () => {
//   const form = new FormData(document.getElementById("post-write-form"));
//   tags = tagValue();
//   tags.forEach((tag, index) => {
//     form.append("tag[" + index + "]", tag);
//     test = form.get("tag[" + index + "]");
//     console.log(form.get("tag[" + index + "]"));
//     // axios
//   });

//   axios
//     .post("/post/postWrite_process", {
//       title: title.value,
//       tagPost: tags,
//       text: text.value,
//     })
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
