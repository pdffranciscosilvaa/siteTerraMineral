window.addEventListener('scroll', function() {
    const btn = document.getElementById('backToTop');
    if (window.pageYOffset > 400) { // Aparece após 400px de descida
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

document.getElementById('backToTop').onclick = function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};