const allposts = document.querySelector('#allposts');
console.log(allposts);
const tweetText = document.getElementById('tweetText');
const tweetIdModal = document.getElementById('tweetId');

allposts.addEventListener('click', async (e) => {
  e.preventDefault();
  const tweetId = e.target.parentNode?.dataset.nomer; // optional chaining operator
  if (e.target.classList.contains('delete')) {
    // console.log(tweetId);
    const ft = await fetch(`/posts/${tweetId}`, { method: 'DELETE' });
    if (ft.status === 200) {
      e.target.parentNode.remove();
    } else {
      alert('error!!!11');
    }
  }
  if (e.target.classList.contains('edit')) {
    tweetText.value = e.target.parentNode.querySelector('span').innerText;
    tweetIdModal.value = e.target.parentNode?.dataset.nomer;
  }
});

const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', async (e) => {
  console.log(`/posts/${tweetIdModal.value}`);
  await fetch(`/posts/${tweetIdModal.value}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ text: tweetText.value }),
  });
  const targetTweet = document.querySelector(`[data-nomer="${tweetIdModal.value}"]`);
  console.log(targetTweet);
  targetTweet.querySelector('span').innerText = tweetText.value;
});


/* ------ */

const fetchBtn = document.getElementById('fetchBtn');

fetchBtn.addEventListener('click', async () => {
  const f = await fetch('/posts/json');
  const result = await f.json();
  console.log(result);
})