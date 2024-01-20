'use strict';

import { tweetsData,replyUserData } from "./data.js";


const feed = document.getElementById('feed')
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click', function () {






})




document.addEventListener('click', function (e) {
  if (e.target.id === 'tweet-btn') {
    handleTweetBtn() // add verfiyed input
  }

  const targetLike = e.target.dataset.likes
  const targetRetweet = e.target.dataset.retweets
  const targetReplies = e.target.dataset.replies
  const targetDots = e.target.dataset.dots
  const targetDeleteBtn = e.target.dataset.delete
  const targetReplyBtn = e.target.dataset.replyBtn



  tweetsData.forEach(function (tweet, index, array) {

    if (tweet.uuid === targetLike) {
      handleLikeBtn(targetLike)

    }else if (tweet.uuid === targetRetweet) {
      handleRetweet(targetRetweet)

    }else if (tweet.uuid === targetReplies) {
      
        handleReplies(targetReplies)
      

    }else if (tweet.uuid === targetDots) {
      showOptions(tweet.uuid)


    }else if (tweet.uuid === targetDeleteBtn) {
      console.log(`this is the delete btn from ${tweet.handle}`)
      console.log(index)
      tweetsData.splice(index,1)
      renderFeedHtml()

    } else if(tweet.uuid === targetReplyBtn){
      
      const userReply = document.getElementById(`textareaReply-${tweet.uuid}`).value
      array[index].replies.push({
        handle: `${replyUserData[0].handle}`,
        profilePic: `${replyUserData[0].profilePic}`,
        tweetText: `${userReply}`,
    })
    renderFeedHtml()
    

      
      
    }
  })//*
})



function getFeedHtml() {
  let htmlElements = ''
  let heartColor = ''
  let retweetColor = ''
  let heartType = ''


  tweetsData.forEach(function (tweet, index, array) {
    tweet.isLiked === true ? (heartColor = 'red', heartType = 'solid') : (heartColor = 'gray', heartType = 'regular')
    tweet.isRetweeted === true ? retweetColor = 'green' : retweetColor = 'gray'
    htmlElements +=
      `<div class="tweet">
      <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div style="position: relative;">
          <div class="options hidden " id="options-${tweet.uuid}">
            <button data-delete=${tweet.uuid}>Delete Tweet</button>
            <button>Modify Tweet</button>
          </div>
            <span>
            <i class="fa-solid fa-ellipsis" data-dots=${tweet.uuid}></i>
            </span>
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
function handleLikeBtn(tweetUuid) {
  tweetsData.forEach(function (tweet) {
    if (tweet.uuid === tweetUuid) {
      tweet.isLiked === false ? (tweet.likes++) : (tweet.likes--)
      tweet.isLiked = !tweet.isLiked
      renderFeedHtml()
    }
  })
}
function handleRetweet(tweetUuid) {
  tweetsData.forEach(function (tweet) {
    if (tweet.uuid === tweetUuid) {
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
      repliesHtml+=` <div class="reply-div">
      <textarea class="replyInput" name="" id="textareaReply-${tweet.uuid}" cols="30" rows="10" placeholder="type something..."></textarea>
      <button class="replyBtn"  data-reply-btn=${tweet.uuid}>reply</button>
    </div>`
    }
  });
  document.getElementById(`replies-${tweetUuid}`).innerHTML = repliesHtml
  document.getElementById(`replies-${tweetUuid}`).classList.toggle('hidden')

}
function generateUUID() {
  // Generate a UUID (v4)
  const uuid = uuidv4();
  return uuid
}
function handleTweetBtn() {
  const userTweet = tweetInput.value
  if (userTweet)
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

function showOptions(tweetUuid) {
  document.getElementById(`options-${tweetUuid}`).classList.toggle('hidden')
}
