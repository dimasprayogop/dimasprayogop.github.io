const grid = document.getElementById('project-grid');

projects.forEach((p, i) => {
    const card = document.createElement('article');

    card.className = 'project-card';

    card.innerHTML = `
        <span class="project-number">
            0${i + 1} / ${p.category}
        </span>

        <h3>${p.title}</h3>

        <p>${p.description}</p>

        <div class="tags">
            ${p.stack.map(s => `<span>${s}</span>`).join('')}
        </div>

        <a href="#" class="text-link" data-project="${i}">
            Explore Project
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
    `;

    grid.appendChild(card);
});

const modal = document.getElementById('project-modal');

document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const p = projects[Number(link.dataset.project)];

        document.getElementById('modal-title').textContent = p.title;
        document.getElementById('modal-desc').textContent = p.description;

        document.getElementById('modal-tags').innerHTML =
            p.stack.map(s => `<span>${s}</span>`).join('');

        document.getElementById('modal-repo').href = p.repo;
        document.getElementById('modal-demo').href = p.demo;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    });
});

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

document.getElementById('modal-close').addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('light');

    const icon = document.querySelector('#theme-toggle i');

    icon.className = document.documentElement.classList.contains('light')
        ? 'fa-solid fa-moon'
        : 'fa-solid fa-sun';
});

document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('open');
});

document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('open');
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');

    loadingScreen.style.opacity = '0';

    setTimeout(() => {
        loadingScreen.remove();
    }, 450);
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});