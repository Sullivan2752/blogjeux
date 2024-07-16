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
