const setupApp = () => {
    hookUpBtns();
    startTimeLine();
  };
  
  var displayName = document.querySelector(".display-name").innerText;
  function hookUpBtns() {
    const lineStartings = [0, 20, 40, 60, 80];
    const pageStartings = [0, -100, -200, -300, -400];
    const underline = document.querySelector(".underline");
    const btns = document.querySelectorAll(".navicon");
    const home = document.querySelector(".home");
    const search = document.querySelector(".search");
    const connect = document.querySelector(".connect");
    const messages = document.querySelector(".messages");
    const profile = document.querySelector(".profile");
    const editMenu = document.querySelector(".edit-menu");
    const editMenuBtn = document.querySelector(".edit");
    const crossSignEdit = document.querySelector(".cross-sign");
    const overlay = document.querySelector(".overlay-background");
    const bronektBtn = document.querySelector(".beingbros-btn");
    const newFeedsContainer = document.querySelector(".newfeeds-container");
    const editInputs = document.querySelectorAll(".edit-input");
    const insertPhotoBtn = document.getElementById("insert-photo-icon");
    const recordBtn = document.getElementById("recording-mic-btn");
    const insertAudio = document.getElementById("insert-sound-icon");
    const crossNotationMic = document.querySelector(".cross-notation-mic");
    const shareBtn = document.querySelector(".share");
    const shareMenu = document.querySelector(".share-menu");
    const crossSignShare = document.getElementById("cross-sign-share");
    const copyProfileLinkBtn = document.getElementById("copy-profile-link");
    const profileOptions = document.getElementById("profile-options");
    const cancelSignOutBtn = document.getElementById("logout-cancel-btn");
    const timeline = document.querySelector(".timeline");
    const insertEmojiIcon = document.getElementById("insert-emoji-icon");
    const searchInput = document.querySelector(".search-input");
    const searchFeeds = document.querySelector(".search-feeds");
  
    const insertGifIcon = document.getElementById('insert-gif-icon');
  
  
  
    insertGifIcon.addEventListener('click',()=>{
        let search_input = document.createElement('input');
        search_input.type = 'text';
        search_input.placeholder = 'Search';
        search_input.style.marginTop =  '5px';
        search_input.style.marginBottom =  '10px';
        search_input.setAttribute('class','search-input');
  
        let menuDiv = document.createElement("div");
        let gifList = document.createElement("ul");
        menuDiv.setAttribute("class", "gif-div");
        gifList.setAttribute("class", "gif-list");
        fetch("https://api.giphy.com/v1/gifs/trending?api_key=Hp18gzUcD8GnldVWFbfaG7ncdmenXo7i&limit=20&rating=g",{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            let gifs = data['data'];
            gifs.forEach(elem=>{
                let gifPlaceholder = document.createElement('img');
                gifPlaceholder.src = elem['images']['fixed_width']['url'];
                gifPlaceholder.style.height = '10px;'
                gifPlaceholder.setAttribute('class','gif-list-item');
                gifList.appendChild(gifPlaceholder);
            });
          
            menuDiv.appendChild(search_input);
            menuDiv.appendChild(gifList);
            newFeedsContainer.insertAdjacentElement("beforebegin", menuDiv);
            let ca = document.querySelector(".brocode-composing-area");
            ca.style.borderBottomRightRadius = "0px";
            ca.style.borderBottomLeftRadius = "0px";
  
        });
  
        search_input.addEventListener('change',()=>{
  
  
            if(search_input.value.length > 1){
  
  
                fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=`,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((data) => {
  
  
            var child = gifList.lastElementChild;  
        while (child) { 
            gifList.removeChild(child); 
            child = gifList.lastElementChild; 
        } 
  
  
            let gifs = data['data'];
            gifs.forEach(elem=>{
                let gifPlaceholder = document.createElement('img');
                gifPlaceholder.src = elem['images']['fixed_width']['url'];
                gifPlaceholder.style.height = '10px;'
                gifList.appendChild(gifPlaceholder);
            });
            
            menuDiv.appendChild(search_input);
            menuDiv.appendChild(gifList);
            newFeedsContainer.insertAdjacentElement("beforebegin", menuDiv);
            let ca = document.querySelector(".brocode-composing-area");
            ca.style.borderBottomRightRadius = "0px";
            ca.style.borderBottomLeftRadius = "0px";
  
        });
  
            }
        });
  
    });
  
    searchInput.addEventListener("keypress", () => {
      if (searchInput.value.length > 1) {
        let searchData = {
          "search-query": searchInput.value,
        };
        postData("/bros/api/searchusers", searchData).then((response) => {
          let _html = "";
          response.forEach((elem) => {
            let elementTemplate = `
                  <div class="entity-placeholder" onclick="entityClicked(this)">
      <div class="tweet-container-left-col">
          <div class="tweet-author-picture-container">
              <img src="https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png" alt="" class="profile-header-img">
          </div>
      </div>
      <div class="tweet-container-right-col">
          <div class="tweet-card-header">
              <span class="slug" hidden>${elem['slug']}</span>
              <div class="tweet-author-display-name">${elem["display_name"]}</div>
          </div>     
      </div>
      </div>`;
            _html += elementTemplate;
          });
          searchFeeds.innerHTML = _html;
        });
      }
    });
  
  
    
  
  
    insertEmojiIcon.addEventListener("click", () => {
      if (!document.querySelector(".emoji-div")) {
        let menuDiv = document.createElement("div");
        let emojiList = document.createElement("ul");
        menuDiv.setAttribute("class", "emoji-div");
        emojiList.setAttribute("class", "emoji-list");
        let number = 0x1f600;
        for (let i = 0; i < 80; i++) {
          let li = document.createElement("li");
          li.setAttribute("class", "emoji-list-item");
          li.innerHTML = `&#x${number.toString(16)};`;
          li.addEventListener("click", (item) => {
            document.getElementById("brocode-composing-area").value +=
              li.innerHTML;
          });
          emojiList.appendChild(li);
          number++;
        }
        menuDiv.appendChild(emojiList);
        newFeedsContainer.insertAdjacentElement("beforebegin", menuDiv);
        let ca = document.querySelector(".brocode-composing-area");
        ca.style.borderBottomRightRadius = "0px";
        ca.style.borderBottomLeftRadius = "0px";
      }
    });
  
    cancelSignOutBtn.addEventListener("click", () => {
      const signOutPrompt = document.getElementById("sign-out-prompt");
      signOutPrompt.classList.toggle("sign-out-blob-disappear");
      overlay.classList.toggle("over-active");
    });
  
    profileOptions.addEventListener("click", () => {
      const signOutPrompt = document.getElementById("sign-out-prompt");
      signOutPrompt.classList.toggle("sign-out-blob-disappear");
      overlay.classList.toggle("over-active");
    });
  
    copyProfileLinkBtn.addEventListener("click", () => {
      const link = document.getElementById("share-link");
      link.select();
      link.setSelectionRange(0, 99999);
      document.execCommand("copy");
    });
  
    crossSignShare.addEventListener("click", () => {
      shareMenu.classList.toggle("menu-hider");
      shareMenu.classList.toggle("menu-shower");
      overlay.classList.toggle("over-active");
    });
  
    shareBtn.addEventListener("click", () => {
      shareMenu.classList.toggle("menu-shower");
      shareMenu.classList.toggle("menu-hider");
      overlay.classList.toggle("over-active");
    });
  
    crossNotationMic.addEventListener("click", () => {
      const micMenuBlob = document.getElementById("mic-blob");
      micMenuBlob.classList.toggle("mic-blob-disappear");
    });
  
    insertAudio.addEventListener("click", () => {
      const micMenuBlob = document.getElementById("mic-blob");
      micMenuBlob.classList.toggle("mic-blob-disappear");
    });
  
    recordBtn.addEventListener(
      "touchstart",
      () => {
        recordBtn.style.color = "rgb(144,238,144)";
      },
      false
    );
  
    recordBtn.addEventListener(
      "touchend",
      () => {
        recordBtn.style.color = "rgb(119, 119, 119)";
      },
      false
    );
  
    insertPhotoBtn.addEventListener("click", () => {
      const inputPhoto = document.getElementById("insert-img-btn");
      inputPhoto.click();
      inputPhoto.addEventListener("change", () => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            img.setAttribute("class", "upload-image-content");
            let imageUploadPlaceHolder = document.createElement("div");
            imageUploadPlaceHolder.setAttribute(
              "class",
              "image-upload-placeholder"
            );
            newFeedsContainer.insertAdjacentElement(
              "afterbegin",
              imageUploadPlaceHolder
            );
            let ca = document.querySelector(".brocode-composing-area");
            ca.style.borderBottomRightRadius = "0px";
            ca.style.borderBottomLeftRadius = "0px";
            imageUploadPlaceHolder.appendChild(img);
          };
        };
  
        reader.readAsDataURL(inputPhoto.files[0]);
      });
    });
  
    editInputs.forEach((elem) => {
      try {
        elem.addEventListener("change", () => {
          elem.parentElement.getElementsByTagName("label").item(0).innerText =
            elem.value;
          elem.value = "";
        });
      } catch (error) {}
    });
  
    bronektBtn.addEventListener("click", () => {
      const bronektComposingArea = document.getElementById(
        "brocode-composing-area"
      );
      if (bronektComposingArea.value.length > 0) {
        let bronektData = {
          "brocode-body": bronektComposingArea.value,
        };
        postData("/bros/api/post_brocode", bronektData).then((response) => {
          let brocodeDiv = document.createElement("div");
          brocodeDiv.setAttribute("class", "tweet");
          brocodeDiv.innerHTML = createNewBrocode(response);
          timeline.insertAdjacentElement("afterbegin", brocodeDiv);
          newFeedsContainer.insertAdjacentElement(
            "afterbegin",
            brocodeDiv.cloneNode(true)
          );
        });
        bronektComposingArea.value = "";
  
        let ca = document.querySelector(".brocode-composing-area");
        ca.style.borderBottomRightRadius = "13px";
        ca.style.borderBottomLeftRadius = "13px";
        if (document.querySelector(".emoji-div")) {
          let emojiDiv = document.querySelector(".emoji-div");
          emojiDiv.parentNode.removeChild(emojiDiv);
        }
        // image-upload-placeholder remove
        if (document.querySelector(".image-upload-placeholder")) {
          let imageDiv = document.querySelector(".image-upload-placeholder");
          imageDiv.parentNode.removeChild(imageDiv);
        }
      } else {
        // do nothing
      }
    });
  
    crossSignEdit.addEventListener("click", () => {
      editMenu.classList.toggle("menu-hider");
      editMenu.classList.toggle("menu-shower");
      overlay.classList.toggle("over-active");
    });
    editMenuBtn.addEventListener("click", () => {
      editMenu.classList.toggle("menu-shower");
      editMenu.classList.toggle("menu-hider");
      overlay.classList.toggle("over-active");
      getProfileData();
    });
  
    var prevScrollpos = 0;
    profile.addEventListener("scroll", () => {
      if (profile.scrollTop >= 0) {
        var currentScrollPos = profile.scrollTop;
        if (prevScrollpos < currentScrollPos) {
          document.querySelector(".navigation-list").style.bottom = "-50px";
          document.querySelector(".underline").style.bottom = "-50px";
        } else {
          document.querySelector(".navigation-list").style.bottom = "0px";
          document.querySelector(".underline").style.bottom = "0px";
        }
        prevScrollpos = currentScrollPos;
      }
    });
  
    home.addEventListener("scroll", () => {
      if (home.scrollTop >= 0) {
        var currentScrollPos = home.scrollTop;
        if (prevScrollpos < currentScrollPos) {
          document.querySelector(".navigation-list").style.bottom = "-50px";
          document.querySelector(".underline").style.bottom = "-50px";
        } else {
          document.querySelector(".navigation-list").style.bottom = "0px";
          document.querySelector(".underline").style.bottom = "0px";
        }
        prevScrollpos = currentScrollPos;
      }
    });
  
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", () => {
        underline.style.left = `${lineStartings[i]}%`;
        btns[i].style.color = "rgb(144,238,144)";
        home.style.transform = `translateX(${pageStartings[i]}vw)`;
        search.style.transform = `translateX(${pageStartings[i]}vw)`;
        connect.style.transform = `translateX(${pageStartings[i]}vw)`;
        messages.style.transform = `translateX(${pageStartings[i]}vw)`;
        profile.style.transform = `translateX(${pageStartings[i]}vw)`;
  
        for (let j = 0; j < btns.length; j++) {
          if (j !== i) {
            btns[j].style.color = "rgb(119, 119, 119)";
          }
        }
      });
    }
  }
  
  function createNewBrocode(brocode) {
    let brocodeTemplate = `
      <div class="tweet-container-left-col">
          <div class="tweet-author-picture-container">
              <img src="https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png" alt="" class="profile-header-img">
          </div>
      </div>
      <div class="tweet-container-right-col">
          <div class="tweet-card-header">
              <div class="tweet-author-display-name">${
                brocode["author-display-name"] == ""
                  ? displayName
                  : brocode["author-display-name"]
              }</div>
              <div class="tweet-author-username">@${brocode["author"]}</div>
          </div>     
          <div class="tweet-content">
              <p class="tweet-content-p">${brocode["story_body"]}</p>
          </div>
          <span hidden class="brocode-time">${new Date(brocode['created']).getTime()/1000}</span>
          <ul class="brocodes-action-btns">
                 <button><li class="brocode-action-btn"><span class="material-icons action-icon">reply</span></li></button><!--
              --><button><li class="brocode-action-btn"><span class="material-icons action-icon">thumb_up</span></li></button><!--
              --><button><li class="brocode-action-btn"><span class="material-icons action-icon">thumb_down</span></li></button><!--
              --><button><li class="brocode-action-btn"><span class="material-icons action-icon ">favorite</span></li></button><!--
              --><button><li class="brocode-action-btn"><span class="material-icons action-icon">share</span></li></button>
          </ul>
      </div>`;
  
    return brocodeTemplate;
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  async function postData(url = "", myData = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(myData),
    });
    return response.json();
  }
  
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
  }
  
  function getProfileData() {
    fetch("/bros/api/profile_data")
      .then((response) => response.json())
      .then((data) => {
        let editLabelName = document.getElementById("edit-label-display-name");
        let editLabelEmail = document.getElementById("edit-label-email");
        let editLabelBio = document.getElementById("edit-label-bio");
        let editLabelDateOfBirth = document.getElementById("dateofbirth");
  
        if (data["bio"] !== "") {
          editLabelName.innerText = data["display_name"];
        }
        editLabelEmail.innerText = data["email"];
        if (data["bio"] !== "") {
          editLabelBio.innerText = data["bio"];
        }
        let date = new Date(data["birthday"]);
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let day = date.getDay().toString().padStart(2, "0");
        let dateString = [year, month, day].join("-");
        editLabelDateOfBirth.value = dateString;
      });
  }
  
  function getBrocodes(timestamp) {
    fetch(`/bros/api/get_brocodes/${parseInt(timestamp)}`)
      .then((response) => response.json())
      .then((data) => {
        let newFeedsContainer = document.querySelector(".newfeeds-container");
        if(data.length>0){
          data.forEach(brocode =>{
          let brocodeDiv = document.createElement("div");
          brocodeDiv.setAttribute("class", "tweet");
          brocodeDiv.innerHTML = createNewBrocode(brocode);
          newFeedsContainer.insertAdjacentElement(
            "afterbegin",
            brocodeDiv.cloneNode(true)
          );
        });
        }
      });
  }
  
  
  function entityClicked(entity){
    let slug = entity.querySelector('.slug').innerText;
    fetch(`/bros/api/profile/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        showProfile(data);
      });
  }
  
  
  function showProfile(data){
    let searchPage = document.querySelector('.search');
    let profile = document.createElement('div');
    profile.setAttribute('class','profile-screen');
    let profileScreenHtml = `
    <div class="profile-header">
    <div class="profile-header-placeholder">
        <img src="https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="profile-header-img" class="profile-header-img">
    </div>
    <div class="profile-card">
            <div id="profile-options">
                <div class="option-dots noselect"></div>
                <div class="option-dots noselect"></div>
                <div class="option-dots noselect"></div>
            </div>
            <div class="profile-card-left">
                <div class="profile-picture-placeholder">
                    <img src="https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png" alt="profile-picture" class="profile-picture-content">
                </div>
                <div class="action-btns">
                    <button class="action-btn follow" onclick="commitFollow(this)" value="${data['username']}">Follow</button>
                </div>
            </div>
            <div class="profile-card-right">
                <h1 class="display-name">
                    ${data['displayName']}
                </h1>
                <h2 class="user-name">@${data['username']}</h2>
                <h4 class="user-bio">${data['bio']}</h4>
                <ul class="user-info">
                    <li class="info-li red">Submitted stories</li>
                    <li class="info-li red">Followers</li>
                    <li class="info-li red">Following</li>
                </ul>
                <ul class="user-info">
                    <li class="info-li">0</li>
                    <li class="info-li">0</li>
                    <li class="info-li">0</li>
                </ul>
            </div>
    </div>
  </div>
  <div class="timeline">
  </div>
    `
    profile.innerHTML = profileScreenHtml;
    searchPage.appendChild(profile);
  
    setTimeout(() => {
      profile.style.transition = 'top 0.4s';
      profile.style.top = '0vh';
    }, 30);
  }
  
  function commitFollow(intent){
    fetch(`/bros/api/commit_follow/${intent.value}`)
    .then(response => response.json())
    .then(response =>{
    });
  }
  
  
  
  
  function startTimeLine(){
    window.setInterval(()=>{
      let timeline = document.querySelector(".newfeeds-container");
      let latestBrocode = timeline.firstElementChild;
      if(latestBrocode){
        let queryTimestamp = latestBrocode.querySelector('.brocode-time').textContent;
        getBrocodes(queryTimestamp);
      }
  
      if(timeline.childNodes>30){
        timeline.removeChild(timeline.lastChild);
      }
    },
      3000);
  }
  
  
  window.onload = setupApp;