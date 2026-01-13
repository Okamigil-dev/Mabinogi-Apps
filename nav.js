class GlobalNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            /* Navigation Styles */
            .global-nav {
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 0 20px;
                height: 40px;
                background: #050506;
                border-bottom: 1px solid var(--border);
                flex-shrink: 0;
            }
            .global-nav a {
                font-size: 11px;
                font-weight: 700;
                color: var(--text-dim);
                text-decoration: none;
                letter-spacing: 0.5px;
                transition: color 0.2s;
                display: flex; align-items: center; gap: 6px;
            }
            .global-nav a:hover { color: #fff; }
            .global-nav a.active { color: var(--accent); }

            .nav-icon { 
                width: 14px; height: 14px; stroke-width: 2.5; stroke: currentColor; fill: none; 
                stroke-linecap: round; stroke-linejoin: round; opacity: 0.8; 
            }
            .global-nav a:hover .nav-icon, .global-nav a.active .nav-icon { opacity: 1; }
            
            /* Hide on mobile if the parent page has a media query hiding .global-nav */
            @media (max-width: 1000px) {
                .global-nav { display: none; }
            }
        </style>

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
            <a href="journals.html" class="${this.isActive('journals.html')}">
                <svg class="nav-icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                JOURNALS
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
        return window.location.href.includes(page) ? 'active' : '';
    }
}

customElements.define('global-nav', GlobalNav);

class UserHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .user-header-container {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }
                .user-text-group {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
                .user-top-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .user-name-display {
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--text-main, #e4e4e7);
                }
                .user-status-display {
                    font-size: 10px;
                    color: var(--text-dim, #a1a1aa);
                }
                .user-avatar-display {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-color: var(--card-bg, #18181b);
                    border: 1px solid var(--border, #27272a);
                    background-size: cover;
                    background-position: center;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a1a1aa'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
                }
            </style>
            <div class="user-header-container">
                <div class="user-text-group">
                    <div class="user-top-row">
                        <!-- Settings Gear -->
                        <a href="settings.html" id="header-settings-btn" style="display:none; color:var(--text-dim); transition:color 0.2s; align-items:center;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-dim)'">
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </a>
                        <div id="header-username" class="user-name-display">Guest</div>
                    </div>
                    <div id="header-status" class="user-status-display">Local Mode</div>
                </div>
                <div id="header-avatar" class="user-avatar-display"></div>
            </div>
        `;

        // Listen for Firebase Auth changes to update THIS specific UI
        // We check for 'firebase' to prevent errors if the SDK isn't loaded yet
        if (typeof firebase !== 'undefined') {
            firebase.auth().onAuthStateChanged(user => {
                this.updateUI(user);
            });
        }
    }

    updateUI(user) {
        const nameEl = this.querySelector('#header-username');
        const statusEl = this.querySelector('#header-status');
        const avatarEl = this.querySelector('#header-avatar');
        const settingsBtn = this.querySelector('#header-settings-btn');

        // Default Avatar SVG (Grey generic user)
        const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a1a1aa'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

        if (user) {
            statusEl.innerText = "Online";
            statusEl.style.color = "var(--accent, #38bdf8)";
            if(settingsBtn) settingsBtn.style.display = "flex";
            
            // Try to get cached profile data (username/avatar) from localStorage
            try {
                const cached = JSON.parse(localStorage.getItem('mabi_user_cache_' + user.uid) || '{}');
                nameEl.innerText = cached.username || user.email;
                if(cached.avatar) {
                    avatarEl.style.backgroundImage = `url('${cached.avatar}')`;
                } else {
                    avatarEl.style.backgroundImage = `url('${defaultAvatar}')`;
                }
            } catch(e) {
                // Fallback if cache fails
                nameEl.innerText = user.email;
                avatarEl.style.backgroundImage = `url('${defaultAvatar}')`;
            }
        } else {
            // Guest State
            nameEl.innerText = "Guest";
            statusEl.innerText = "Local Mode";
            statusEl.style.color = "var(--text-dim, #a1a1aa)";
            avatarEl.style.backgroundImage = `url('${defaultAvatar}')`;
            if(settingsBtn) settingsBtn.style.display = "none";
        }
    }
}

// Register the new component
customElements.define('user-header', UserHeader);
