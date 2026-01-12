class GlobalNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="global-nav">
            <a href="index.html" class="${this.isActive('index.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                HOME
            </a>
            <a href="tracker.html" class="${this.isActive('tracker.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                TRACKER
            </a>
            <a href="barter.html" class="${this.isActive('barter.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><path d="M7 10h14l-4-4"/><path d="M17 14H3l4 4"/></svg>
                BARTER
            </a>
            <a href="commerce.html" class="${this.isActive('commerce.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                COMMERCE
            </a>
            <a href="wishlist.html" class="${this.isActive('wishlist.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                WISHLIST
            </a>
            <a href="calculators.html" class="${this.isActive('calculators.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="18" x2="16" y2="18"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
                CALCULATORS
            </a>
            <a href="simulator.html" class="${this.isActive('simulator.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                SIMULATOR
            </a>
        </nav>
        `;
    }

    isActive(page) {
        // Simple logic to check if current URL contains the page name
        return window.location.href.includes(page) ? 'active' : '';
    }
}

customElements.define('global-nav', GlobalNav);
