// 페이지가 그려지기 전에 테마를 적용해 다크모드 깜빡임(FOUC)을 막습니다.
(function () {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-bs-theme', saved || (prefersDark ? 'dark' : 'light'));
})();
