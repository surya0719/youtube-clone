let videoCardContainer = document.querySelector(".video-container");

let api_key = "AIzaSyCmGgD2OFDP5P28C9o4l1OnV7gzX6m4r_w";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

///--> this block code i fetch video url from the google api.

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((response) => response.json())
  .then((data) => {
    data.items.forEach((item) => {
      //-->usin foreach method for receive all data from api.
      getChannelIcon(item);
    });
  })
  .catch((error) => console.log(error));

//this block of code is for get a channel icon from the api.
const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url; //-->this line indicate that receive icon from api i insert in snippet.
      console.log(video_data);
      makeVideoCard(video_data);
    })
    .catch((error) => console.log(error));
};

//this block is code is for video card in home page
const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href='https://www.youtube.com/watch?v=${data.id}'">  <!--the id was provided in api that data i fetch here using data.id.-->
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail"  alt="">
    <div class="content">
        <img src="${data.channelThumbnail}"  class="channel-icon" alt="">
         <div class="info">
            <h4 class="tittle">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
         </div>
    </div>
</div> 
    `;
};
///this line is used for search bar
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query="; //-->this url is youtube search url input add at last.
searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
