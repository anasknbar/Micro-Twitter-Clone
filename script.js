'use strict';

import { tweetsData } from "./data.js";


const feed = document.getElementById('feed')
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click',function(){
  
  


  

})
 



document.addEventListener('click', function (e) {
  if(e.target.id === 'tweet-btn'){
    handleTweetBtn()
  }
 
  const targetLike = e.target.dataset.likes
  const targetRetweet = e.target.dataset.retweets
  const targetReplies = e.target.dataset.replies



  for (let tweet of tweetsData) {

    if (tweet.uuid === targetLike) {
      handleLikeBtn(targetLike)
     
    }

    else if (tweet.uuid === targetRetweet) {
      handleRetweet(targetRetweet)
      

    } else if(tweet.uuid === targetReplies){
        if(tweet.replies.length > 0){
        
          handleReplies(targetReplies)
        
        
        
      }
    
        
    }
  }
})



function getFeedHtml() {
  let htmlElements = ''
  let heartColor = ''
  let retweetColor = ''
  let heartType = ''


  tweetsData.forEach(function (tweet, index, array) {
    tweet.isLiked === true ? (heartColor = 'red', heartType = 'solid'): (heartColor = 'gray', heartType = 'regular')
    tweet.isRetweeted === true ? retweetColor = 'green' : retweetColor = 'gray' 
    htmlElements +=
      `<div class="tweet">
      <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                  <i class="fa-regular fa-comment-dots" style="color:gray" data-replies=${tweet.uuid}></i>${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                  <i class="fa-${heartType} fa-heart" style="color:${heartColor}" data-likes=${tweet.uuid}></i>${tweet.likes}
                </span>
                <span class="tweet-detail">
                  <i class="fa-solid fa-retweet" style="color:${retweetColor}" data-retweets=${tweet.uuid}></i>${tweet.retweets}
                </span>
            </div>   
        </div>            
      </div>
      <div class='hidden' id="replies-${tweet.uuid}">
        <!-- REPLIES HERE -->
      </div>
    </div>
    
    `
  })
  return htmlElements
}








renderFeedHtml()



function renderFeedHtml() {
  feed.innerHTML = getFeedHtml()
}
function  handleLikeBtn(tweetUuid){
  tweetsData.forEach(function(tweet){
    if(tweet.uuid === tweetUuid){
      tweet.isLiked === false ? (tweet.likes++) : (tweet.likes--)
      tweet.isLiked = !tweet.isLiked
      renderFeedHtml()
    }
  })
}  
function handleRetweet(tweetUuid){
  tweetsData.forEach(function(tweet){
    if(tweet.uuid === tweetUuid){
      tweet.isRetweeted === false ? tweet.retweets++ : tweet.retweets--
      tweet.isRetweeted = !tweet.isRetweeted
      renderFeedHtml()
    }
  })
}
function handleReplies(tweetUuid) {
  let repliesHtml = '';
  tweetsData.forEach(function (tweet) {
    if (tweet.uuid === tweetUuid) {
      for (let reply of tweet.replies) {
        repliesHtml +=
          `
          <div class="tweet-reply">
            <div class="tweet-inner">
              <img src="${reply.profilePic}" class="profile-pic">
              <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
              </div>
            </div>
          </div>
          `;
      }
    }
  });
  document.getElementById(`replies-${tweetUuid}`).innerHTML = repliesHtml
  document.getElementById(`replies-${tweetUuid}`).classList.toggle('hidden')
 
}
function generateUUID(){
  // Generate a UUID (v4)
  const uuid = uuidv4();
  return uuid
}
function handleTweetBtn(){
  const userTweet = tweetInput.value
  
    tweetsData.unshift(

    
      {
        handle: `@AnasMohKnbar 💎`,
        profilePic: `img/pic1.png`,
        likes: 0,
        retweets: 0,
        tweetText: userTweet,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: generateUUID(),
    }
      
      )
      renderFeedHtml()
      tweetInput.value = ''   
  
    
      
}
