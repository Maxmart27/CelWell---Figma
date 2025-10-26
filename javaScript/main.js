document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function () {
        const opened = nav.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
        hamburger.classList.toggle('is-active', opened);
    });
});