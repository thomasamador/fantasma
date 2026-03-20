import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

export function initLightbox() {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '.kg-image-card, .kg-gallery-card',
        children: 'img[width][height], .kg-gallery-image img',
        pswpModule: PhotoSwipe,
        bgOpacity: 0.9,
        closeOnVerticalDrag: true,
    });
    lightbox.init();
}
