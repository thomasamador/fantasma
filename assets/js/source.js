import imagesLoaded from 'imagesloaded';
import reframe from 'reframe.js';

import { initMobileMenu } from './modules/mobile-menu.js';
import { initDropdown } from './modules/dropdown.js';
import { initLightbox } from './modules/lightbox.js';
import { initPagination } from './modules/pagination.js';
import { initResponsiveVideos } from './modules/responsive-videos.js';
import { initResponsiveTables } from './modules/responsive-tables.js';
import { initThemeToggle } from './modules/theme-toggle.js';
import { initFeedFilter } from './modules/feed-filter.js';

initMobileMenu();
initDropdown(imagesLoaded);
initLightbox();
initResponsiveVideos(reframe);

if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
    initPagination();
}

initResponsiveTables();
initThemeToggle();
initFeedFilter();
