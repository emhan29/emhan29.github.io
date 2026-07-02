// protection.js
(function() {
    'use strict';

    // Blokir Klik Kanan
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // Blokir Keyboard Shortcut
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        if (e.ctrlKey) {
            if (e.key === 'u' || e.key === 'U') {
                e.preventDefault();
                return false;
            }
            if (e.key === 's' || e.key === 'S') {
                e.preventDefault();
                return false;
            }
        }

        if (e.ctrlKey && e.shiftKey) {
            if (e.key === 'i' || e.key === 'I' || 
                e.key === 'j' || e.key === 'J' ||
                e.key === 'c' || e.key === 'C') {
                e.preventDefault();
                return false;
            }
        }
    });

    // Blokir Drag
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    console.log('🔒 Proteksi aktif');
})();