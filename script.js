function toggleLike(button) {
    const likeIcon = button.querySelector('.like-icon');
    const likeCount = button.querySelector('.like-count');
    let count = parseInt(likeCount.textContent);

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        count--;
    } else {
        button.classList.add('liked');
        count++;
    }

    likeCount.textContent = count;
}
document.addEventListener("DOMContentLoaded", function() {
    loadReactions();
});

function toggleLike(button) {
    const articleOrVideo = button.closest('.article, .video');
    const id = articleOrVideo.getAttribute('data-id');
    const reactionType = button.getAttribute('data-reaction');
    const likeCountElement = button.querySelector('.like-count');
    let count = parseInt(likeCountElement.textContent);

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        count--;
    } else {
        button.classList.add('liked');
        count++;
    }

    likeCountElement.textContent = count;
    saveReaction(id, reactionType, count, button.classList.contains('liked'));
}

function saveReaction(id, reactionType, count, isLiked) {
    let reactions = JSON.parse(localStorage.getItem('reactions')) || {};

    if (!reactions[id]) {
        reactions[id] = {};
    }

    reactions[id][reactionType] = { count: count, liked: isLiked };

    localStorage.setItem('reactions', JSON.stringify(reactions));
}

function loadReactions() {
    let reactions = JSON.parse(localStorage.getItem('reactions')) || {};

    for (let id in reactions) {
        let element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            for (let reactionType in reactions[id]) {
                let reaction = reactions[id][reactionType];
                let button = element.querySelector(`.like-button[data-reaction="${reactionType}"]`);
                let likeCountElement = button.querySelector('.like-count');
                
                likeCountElement.textContent = reaction.count;
                if (reaction.liked) {
                    button.classList.add('liked');
                }
            }
        }
    }
}
