# Release History

All notable changes to Maker Portfolio, organized by date and git commit hash.

---

## 2026-02-06

### `005d933` - Restyle Engineering Calculators to match portfolio's dark zinc/amber theme

### `e6a46b3` - Add Engineering Calculators to main page integrated apps

### `1a93eaf` - Update print label CSS to specify 40x30mm label size

### `389d9db` - Add preferences menu with tab visibility toggles when logged in

### `4fa4c57` - Fix stuck sliders in Analog Filter Designer with log-mapped ranges

### `a96f5af` - Add H(s) transfer function as design input to both filter designers

### `0496950` - Update documentation and screenshots for renamed apps

### `4cc55c2` - Rename apps and add transfer function displays

### `1cfce74` - Refactor printLabel() to use same render output as exportPNG()

### `6081109` - Fix RLC Calculator layout to match Filter Designer scrolling

### `d78506e` - Make README.md the default opening item in project modal

### `84ddcde` - Fix label designer export/print alignment to match design canvas

### `2a775d6` - Update documentation and add screenshots for new apps

### `389521e` - Add discrete biquad filter designer as new tab

### `615dc06` - Restyle RLC calculator to match main portfolio theme

### `b4e75b9` - Add RLC Calculator as integrated app tab

### `c17aeac` - Fix silent barcode failure on inventory import in label designer

### `a1bd258` - Collapse nav tabs into hamburger menu on mobile/tablet

### `b011a43` - Add TrustedParts API as 3rd search mode in datasheet tab

### `0e58754` - Encrypt NEXAR credentials with admin auth via AES-256-GCM

### `df1ff64` - Add NEXAR API search mode to datasheet search

### `3e41d2d` - Update README and add SVG screenshots for all apps

### `922db65` - Rename Projects tab to Original Projects

### `faa501d` - Add datasheet search and 3D model library tabs

### `937938d` - Add camera-based resistor color band scanner

### `33b0e4f` - Add resistor color code generator as integrated app tab

### `12609cf` - Add basic shapes feature with resize support to label designer

### `3b7fa18` - Fix inventory import: always write localStorage in lab-inventory

### `95b0b40` - Remove built-in label maker from lab-inventory app

### `8f77bf7` - Move lab-inventory auth to main page admin login

### `fcb512c` - Fix inventory loading: try localStorage first, open IndexedDB without version

### `bd47ff7` - Add print label button with custom page size matching canvas

### `2b6a4dd` - Add lab inventory import feature to label designer

### `944db32` - Add Falstad Circuit Simulator as fullscreen app tab

### `7b2dfb3` - Make Lab Inventory and Ray Optics render fullscreen

### `57da581` - Make label designer embed fullscreen, hiding chrome and padding

### `ae64591` - Add Ray Optics simulator as an external app tab

### `ddc4ff7` - Add Label Designer as integrated app tab in portfolio

### `92c8920` - Add code view with syntax highlighting to project modal

### `18c665c` - Collapse folder tree by default in document reader

### `b977f60` - Replace flat file list with collapsible folder tree in doc reader

### `7b48e67` - Fix emoji rendering in markdown reader

### `5ac6810` - Add about section with build info and pre-commit hook

### `35ebc6d` - Exclude pages repo from portfolio by default

### `609f900` - Add admin login interface with repo hide/unhide functionality

### `dbd3440` - Add separate Forked Projects tab next to Projects tab

---

## 2026-02-05

### `51cbdc9` - Add login screen to protect lab inventory access

### `9540075` - Restyle Lab Inventory to match Maker Portfolio dark/amber theme

### `0b05ba1` - Add fork filter dropdown to portfolio page

### `e42ec29` - Fix markdown rendering for marked.js v12+ API changes

### `689e11d` - Fix barcode rendering in Label Maker

### `4b3f2d6` - Increase MAX_REPOS to 100 to show all repositories

### `19bd95b` - Show forked repos in portfolio

### `56e5ccd` - Rename portfolio.html to index.html

### `6ca4718` - Clean up repo to keep only portfolio.html and its dependencies

### `c5afde6` - Add pre-commit hook for auto version updates

### `77c9f26` - Fix barcode rendering in Label Maker

### `717ed6b` - Add inventory item selector to Label Maker

### `c2d0016` - Add Easy Label Maker as a new page

---

## 2026-02-01

### `93f557e` - Add multiple CORS proxy fallbacks for image download

### `a603da2` - Fix CORS issues when downloading product images

### `0416dc7` - Fix barcode scanner crash and add more formats

### `4f464b2` - Fix barcode scan handling - no more white screen

### `60ac2e1` - Add download button to sync photo from product URL

### `5048a51` - Rename storage blocks based on subcategories

### `edf772a` - Add release history document with link in web interface

### `8a9899f` - Replace version number with git hash and build date

### `836a1d2` - Replace low stock warnings with project overallocation warnings

### `bcb1994` - Add automatic version check with update banner

### `d8c5138` - Update scanner for CODE128 barcode support

### `77b9824` - Remove Boxes tab from lab inventory

### `36239b4` - Add sync photos from product links feature

### `078e893` - Update lab map to match physical layout

### `e05aecb` - Add nested menus for Locaties view

### `6b6cc19` - Sort boxes alphabetically by label

### `76635ed` - Add missing JSON fields to GUI display and editing

### `cad748c` - Switch from QR codes to CODE128 barcodes for label printing

### `b42af99` - Change batch print to use separate pages per label

### `e4b1be2` - Update lab map to show dynamic locations from Locaties tab

### `2c3aea7` - Fix QR code generation - generate directly in LabelImage

### `4b2aad8` - Remove PDF generation, use canvas images for all labels

### `39aaa0e` - Add force update button in About section

### `be8ee7d` - Switch single label printing to canvas images, add About section

### `f53369e` - Update all print functions to use PDF generation

### `9c64a7f` - Fix QR code printing - generate reliably before print

### `a6a5da5` - Add Locaties (shelves/drawers) view with collapsible boxes

### `2c52abf` - Improve project assignment UI with -/+ quantity buttons

### `1111e41` - Add interactive lab map view

### `3e686f7` - Fix dark mode text contrast for readability

### `1d7d111` - Add dropdown for existing projects in ItemModal

### `ed50ea1` - Add value field and projects/BoM system

### `2cec0ff` - Add batch delete for filtered items

### `87894e7` - Add dark mode theme and Material Design icons

### `cd05eca` - Add OWASP security improvements
- Content Security Policy, XSS prevention, input sanitization

### `55c2a76` - Add ZIP export/import with photos

### `12d7fe5` - Add auto-update functionality to service worker

### `e74f929` - Add QR code display for item 12NC codes

### `66390e9` - Add Philips 12NC identification codes to items

### `0258d02` - Add IndexedDB storage with photo support

### `7ca5282` - Add QR code printing functionality via CUPS

---

## 2026-01-31

### `9393842` - Change box click to navigate to Items tab with filter

### `a21d399` - Fix box click modal display and add storage box creation feature

### `27c6221` - Initial upload
- Portfolio SPA with GitHub API integration
- Box-based lab inventory organization
- PWA with offline support
