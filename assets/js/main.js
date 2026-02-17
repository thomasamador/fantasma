/**
 * =============================================================================
 * MAIN JAVASCRIPT
 * =============================================================================
 * 
 * Theme JavaScript for interactive components.
 * Loaded in default.hbs before {{ghost_foot}}.
 * 
 * CONTENTS:
 * 1. Mobile Menu Toggle - Hamburger button functionality
 * 
 * =============================================================================
 */


/* -----------------------------------------------------------------------------
   1. Mobile Menu Toggle
   -----------------------------------------------------------------------------
   
   Toggles the mobile navigation menu when the hamburger button is clicked.
   
   Behavior:
   - Adds/removes 'is-open' class on #gh-head
   - Locks body scroll when menu is open (prevents background scrolling)
   - CSS handles the visual transition (see custom.css §5)
   
   HTML Requirements:
   - Header must have id="gh-head"
   - Burger button must have class="gh-burger"
   -------------------------------------------------------------------------- */

(function () {
    const header = document.getElementById('gh-head');
    const burger = header ? header.querySelector('.gh-burger') : null;
    
    if (!burger) return;

    burger.addEventListener('click', function () {
        if (!header.classList.contains('is-open')) {
            // Open menu
            header.classList.add('is-open');
            document.documentElement.style.overflowY = 'hidden';
        } else {
            // Close menu
            header.classList.remove('is-open');
            document.documentElement.style.overflowY = '';
        }
    });
})();
