document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderProjects(window.PROJECTS || []);
    initReveal();
    initBackToTop();
    initContactForm();

    document.getElementById('printResume').addEventListener('click', () => window.print());
    document.getElementById('year').textContent = new Date().getFullYear();

    // 모바일 메뉴: 링크 클릭 시 자동으로 닫기
    const navCollapse = document.getElementById('navbarNav');
    navCollapse.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => bootstrap.Collapse.getInstance(navCollapse)?.hide());
    });
});

/* ---------- 다크 모드 ---------- */
function initThemeToggle() {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const icon = btn.querySelector('i');

    const sync = () => {
        const dark = root.getAttribute('data-bs-theme') === 'dark';
        icon.className = dark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        btn.setAttribute('aria-label', dark ? '라이트 모드 전환' : '다크 모드 전환');
    };

    btn.addEventListener('click', () => {
        const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-bs-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        sync();
    });
    sync();
}

/* ---------- 프로젝트 렌더링 + 필터 ---------- */
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function projectCard(p) {
    const thumb = p.image
        ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)} 미리보기" loading="lazy">`
        : '<i class="bi bi-window-stack" aria-hidden="true"></i>';
    const tags = p.tags.map((t) => `<span class="badge me-1 mb-1">${escapeHtml(t)}</span>`).join('');
    const links = [
        p.demo && `<a href="${escapeHtml(p.demo)}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Demo</a>`,
        p.github && `<a href="${escapeHtml(p.github)}" class="btn btn-sm btn-outline-secondary" target="_blank" rel="noopener"><i class="bi bi-github"></i> Source</a>`
    ].filter(Boolean).join('');

    return `
        <div class="col project-col" data-category="${escapeHtml(p.category)}">
            <article class="card h-100 project-card">
                <div class="project-thumb">${thumb}</div>
                <div class="card-body">
                    <h3 class="h5 card-title fw-bold">${escapeHtml(p.title)}</h3>
                    <p class="card-text text-body-secondary">${escapeHtml(p.description)}</p>
                    <div>${tags}</div>
                </div>
                ${links ? `<div class="card-footer d-flex gap-2 pb-3">${links}</div>` : ''}
            </article>
        </div>`;
}

function renderProjects(projects) {
    const list = document.getElementById('projectList');
    const filters = document.getElementById('projectFilters');
    list.innerHTML = projects.map(projectCard).join('');

    const categories = ['All', ...new Set(projects.map((p) => p.category))];
    filters.innerHTML = categories.map((c, i) =>
        `<button type="button" class="btn btn-sm filter-btn ${i === 0 ? 'btn-primary' : 'btn-outline-secondary'}" data-filter="${escapeHtml(c)}" aria-pressed="${i === 0}">${escapeHtml(c)}</button>`
    ).join('');

    filters.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        const value = btn.dataset.filter;
        filters.querySelectorAll('[data-filter]').forEach((b) => {
            const active = b === btn;
            b.classList.toggle('btn-primary', active);
            b.classList.toggle('btn-outline-secondary', !active);
            b.setAttribute('aria-pressed', active);
        });
        list.querySelectorAll('.project-col').forEach((col) => {
            col.classList.toggle('d-none', value !== 'All' && col.dataset.category !== value);
        });
    });
}

/* ---------- 스크롤 등장 애니메이션 ---------- */
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('visible'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
}

/* ---------- 맨 위로 버튼 ---------- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    const onScroll = () => btn.classList.toggle('show', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0 }));
    onScroll();
}

/* ---------- Netlify Forms 비동기 전송 ---------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submit = form.querySelector('button[type="submit"]');
    const spinner = submit.querySelector('.spinner-border');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        submit.disabled = true;
        spinner.classList.remove('d-none');
        status.className = 'mt-3 small';
        status.textContent = '';

        try {
            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(form)).toString()
            });
            if (!res.ok) throw new Error(res.status);
            form.reset();
            form.classList.remove('was-validated');
            status.classList.add('text-success');
            status.textContent = '메시지가 전송되었습니다. 빠르게 회신드리겠습니다!';
        } catch (err) {
            status.classList.add('text-danger');
            status.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
        } finally {
            submit.disabled = false;
            spinner.classList.add('d-none');
        }
    });
}
