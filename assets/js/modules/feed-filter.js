export function initFeedFilter() {
    const filterBar = document.querySelector('.gh-feed-filters');
    if (!filterBar) return;

    const feed = document.querySelector('.gh-feed');
    if (!feed) return;

    const filterBtns = filterBar.querySelectorAll('.gh-filter-btn');
    const sortBtns = filterBar.querySelectorAll('.gh-sort-btn');

    let activeFilter = sessionStorage.getItem('gh-feed-filter') || 'all';
    let activeSort = sessionStorage.getItem('gh-feed-sort') || 'latest';

    function applyFilter(filter) {
        activeFilter = filter;
        sessionStorage.setItem('gh-feed-filter', filter);

        filterBtns.forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.filter === filter);
        });

        feed.querySelectorAll('.gh-card').forEach(card => {
            const type = card.dataset.postType;
            const visible = filter === 'all' || type === filter;
            card.style.display = visible ? '' : 'none';
        });
    }

    function applySort(sort) {
        activeSort = sort;
        sessionStorage.setItem('gh-feed-sort', sort);

        sortBtns.forEach(btn => {
            const isActive = btn.dataset.sort === sort;
            btn.setAttribute('aria-pressed', String(isActive));
            btn.classList.toggle('is-active', isActive);
        });

        const cards = Array.from(feed.querySelectorAll('.gh-card'));
        cards.sort((a, b) => {
            const dateA = parseInt(a.dataset.date || '0', 10);
            const dateB = parseInt(b.dataset.date || '0', 10);
            return sort === 'latest' ? dateB - dateA : dateA - dateB;
        });

        cards.forEach(card => feed.appendChild(card));
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => applySort(btn.dataset.sort));
    });

    // Restore persisted state
    applyFilter(activeFilter);
    applySort(activeSort);
}
