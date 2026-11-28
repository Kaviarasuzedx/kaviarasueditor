import { logos } from './logos.js';

const css = '/contact-card.css';
export const platforms = {
  Discord: ['#5865F2', '#9DA7FF', '#5865F2'],
  Instagram: ['#E4405F', '#F2A264', '#E4405F'],
  Telegram: ['#229ED9', '#83D5F3', '#229ED9'],
  Gmail: ['#EA4335', '#F4A178', '#EA4335'],
  LinkedIn: ['#0A66C2', '#66B7F5', '#0A66C2'],
  X: ['#E7E7EB', '#A7ABB4', '#E7E7EB'],
};

const logoColors = {
  Discord: '#5865F2',
  Instagram: '#E4405F',
  Telegram: '#229ED9',
  Gmail: '#EA4335',
  LinkedIn: '#0A66C2',
  X: '#FFFFFF',
};

export class SocialContactCard extends HTMLElement {
  static observedAttributes = ['platform', 'primary', 'accent', 'glow', 'label', 'url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.frame = 0;
  }

  connectedCallback() { this.render(); }
  disconnectedCallback() { this.cleanup?.(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    this.cleanup?.();
    const name = this.getAttribute('platform') || 'Discord';
    const colors = platforms[name] || platforms.Discord;
    const logo = this.logo || logos[name] || logos.Discord;
    const label = this.getAttribute('label') || `Connect on ${name}`;
    let url;
    try {
      const parsed = new URL(this.getAttribute('url') || '');
      if (['https:', 'mailto:'].includes(parsed.protocol)) url = parsed.href;
    } catch { /* Leave unconfigured destinations unavailable. */ }

    this.shadowRoot.innerHTML = `<link rel="stylesheet" href="${css}"><a class="scene" role="link"><div class="stage"><div class="panel front"><div class="logo"><svg aria-hidden="true" focusable="false"><path fill="var(--logo-color)"/></svg></div><h3 class="heading"></h3></div></div></a>`;

    const scene = this.shadowRoot.querySelector('.scene');
    ['primary', 'accent', 'glow'].forEach((key, index) => {
      const value = this.getAttribute(key) || colors[index];
      scene.style.setProperty(`--${key}`, CSS.supports('color', value) ? value : colors[index]);
    });
    scene.style.setProperty('--logo-color', logoColors[name] || logoColors.Discord);
    this.shadowRoot.querySelector('svg').setAttribute('viewBox', logo.viewBox);
    this.shadowRoot.querySelector('path').setAttribute('d', logo.path);
    this.shadowRoot.querySelector('.heading').textContent = name;
    scene.setAttribute('aria-label', url ? `${label} (opens ${url.startsWith('mailto:') ? 'email' : 'in a new tab'})` : `${label} (destination not configured)`);
    if (url) {
      scene.href = url;
      if (url.startsWith('https:')) {
        scene.target = '_blank';
        scene.rel = 'noopener noreferrer';
      }
    } else {
      scene.setAttribute('aria-disabled', 'true');
      scene.tabIndex = 0;
    }

    const media = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
    let latest;
    const move = (event) => {
      if (!media.matches || event.pointerType === 'touch') return;
      latest = event;
      scene.classList.add('active');
      if (this.frame) return;
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        const rect = scene.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (latest.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (latest.clientY - rect.top) / rect.height));
        scene.style.setProperty('--mx', `${x * 100}%`);
        scene.style.setProperty('--my', `${y * 100}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      scene.classList.remove('active');
      for (const key of ['rx', 'ry', 'mx', 'my']) scene.style.removeProperty(`--${key}`);
    };
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerleave', leave);
    media.addEventListener('change', leave);
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        scene.classList.add('enter');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(scene);
    this.cleanup = () => {
      leave();
      observer.disconnect();
      media.removeEventListener('change', leave);
    };
  }
}

if (!customElements.get('social-contact-card')) customElements.define('social-contact-card', SocialContactCard);
