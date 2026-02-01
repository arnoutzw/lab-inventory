# Lab Inventory

A Progressive Web App (PWA) for managing electronics lab inventory with barcode support, photo storage, and Philips 12NC identification.

## Features

- **Box-based Organization**: Organize items in labeled storage boxes (KUGGIS, FJÄLLA, etc.)
- **Nested Location Menus**: Hierarchical navigation (e.g., Blok 1 > Lade A > boxes)
- **Lab Map View**: Visual layout of physical storage locations
- **12NC Identification**: Each item has a unique Philips 12NC code with barcode
- **Photo Support**: Add photos to items, stored locally in IndexedDB
- **Sync Photos from Links**: Download product images from URLs in Settings
- **Barcode Scanning**: Scan barcodes to quickly find boxes
- **Barcode Printing**: Print CODE128 barcode labels via CUPS/system printer (40x30mm)
  - Box barcode labels (batch or single)
  - Item 12NC barcode labels
  - Canvas-based image generation for precise sizing
- **Category Filtering**: Filter by Electronics, 3D Printing, Mechanical, or Other
- **Overallocation Warnings**: Alerts when project allocations exceed available quantity
- **Offline Support**: Works without internet connection (PWA)
- **Auto-Update**: Automatically fetches latest version when online
- **Version Info**: About section with git hash, build date, and release history
- **Force Update**: Manual update check button in Settings
- **Mobile Optimized**: Touch-friendly interface with safe area support
- **Dark Mode**: Toggle dark theme in settings

## Usage

### Quick Start

1. Open `index.html` in a modern browser
2. Install as PWA for mobile use (Add to Home Screen)

### Navigation

- **Locaties**: Nested menu of locations (Blok > Lade > boxes)
- **Items**: Searchable list of all items with quick quantity controls
- **BoM**: Bill of Materials / project assignments
- **Map**: Visual lab layout with clickable locations
- **Search**: Type to filter, click "Wis" to clear

### Header Buttons

| Button | Action |
|--------|--------|
| 📷 | Scan barcode |
| 📦 | Add new box |
| 🖨️ | Print barcode labels |
| ➕ | Add new item |
| ⚙️ | Settings |

### Adding Items with Photos

1. Click ➕ to add new item
2. Click the photo placeholder to add a photo
3. Fill in item details (name, category, subcategory, box, quantity)
4. Add product link and image URL if available
5. Assign to projects if needed
6. 12NC code is auto-generated based on category
7. Barcode appears next to 12NC field
8. Click "Opslaan" to save

### Printing Barcode Labels

Labels are generated as high-resolution images (472x354px at 300 DPI) for precise 40x30mm output using CODE128 barcodes.

**Batch Box Labels:**
1. Click 🖨️ in the header
2. Select boxes to print
3. Set number of copies per label
4. Toggle "Include box description"
5. Click "Print Labels" - each label prints on separate page

**Single Box Label:**
1. Click a box to open details
2. Click "🖨️ Print Barcode" button

**Item 12NC Label:**
1. Click an item to edit
2. Click "🖨️ Print" next to the 12NC barcode

### Data Management

- **Export**: Download inventory as ZIP file containing:
  - `inventory.json` - boxes and items data
  - `photos/` folder with all item photos
- **Import**: Load from ZIP (with photos) or legacy JSON file
- **Reset**: Clear all data and reload defaults

#### Export Format (ZIP)

```
inventory_2024-01-15.zip
├── inventory.json      # Boxes, items, photo references
└── photos/
    ├── photo_123.jpg   # Photo for item ID 123
    ├── photo_456.jpg
    └── ...
```

## 12NC Identification System

Each item has a unique 12-digit Philips NC code (introduced 1963).

### Format: `XXYY ZZZ ZZZZZ`

```
4822 000 00001
├─┤├─┤├──────┤
 │  │     └── Product number (8 digits, sequential)
 │  └──────── Coding centre (22 = Netherlands)
 └─────────── Product group (HIG)
```

### Product Groups

| Code | Category | Philips HIG |
|------|----------|-------------|
| 48 | Electronics | Electronic components |
| 40 | 3D Printing | Professional electronics |
| 24 | Mechanical | Electromechanical parts |
| 53 | Other | Service parts |

### Item Barcodes

Each item's 12NC code is encoded as a CODE128 barcode (without spaces):
- Display: `4822 000 00001`
- Barcode encodes: `482200000001`

## File Structure

```
lab-inventory/
├── index.html              # Main application
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (auto-update)
├── icon-192.png            # App icon (192x192)
├── icon-512.png            # App icon (512x512)
├── inventory_database.json # Default inventory data
└── README.md               # This file
```

## Technical Details

- **Frontend**: React 18, Tailwind CSS
- **Storage**: IndexedDB (primary), localStorage (fallback)
- **Photo Storage**: IndexedDB blobs, auto-resized to max 800px
- **Barcodes**: JsBarcode (CODE128 generation), html5-qrcode (scanning)
- **Label Generation**: HTML5 Canvas (472x354px at 300 DPI for 40x30mm labels)
- **Printing**: Browser print dialog (works with CUPS)

### IndexedDB Stores

| Store | Purpose |
|-------|---------|
| `inventory` | Boxes and items data |
| `photos` | Item photos as blobs |
| `settings` | App configuration |

### Service Worker

The PWA uses a smart caching strategy:

| Resource | Strategy |
|----------|----------|
| `index.html` | Network-first (always fetch latest) |
| CDN assets | Cache-first with background update |
| Icons | Cache-first |

**Auto-Update Features:**
- Checks for updates every 5 minutes
- Automatically reloads when new version is available
- Notifies clients via postMessage
- Works offline with cached version

### Data Migration

- Existing localStorage data auto-migrates to IndexedDB on first load
- Falls back to localStorage if IndexedDB is unavailable

## Box Label Format

Barcodes encode: `INVBOX:{box_label}` (e.g., `INVBOX:KS-01`)

### Box Prefixes

| Prefix | Box Type |
|--------|----------|
| KS | KUGGIS 13×18×8 |
| KF | KUGGIS 18×26×8 |
| KM | KUGGIS 18×26×15 |
| KT | KUGGIS 26×35×15 |
| FD | FJÄLLA Doos |
| FH | FULLSMOCKAD |
| LV | LÄTTVIST |

## Security

This application implements security measures based on [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) recommendations.

### Content Security Policy (CSP)

A strict CSP header is configured via meta tag to mitigate XSS attacks:

| Directive | Policy |
|-----------|--------|
| `default-src` | `'self'` |
| `script-src` | `'self'` + CDN hosts |
| `style-src` | `'self' 'unsafe-inline'` |
| `img-src` | `'self' data: blob:` |
| `object-src` | `'none'` |
| `frame-ancestors` | `'none'` |

### XSS Prevention

- **Output Encoding**: All user data is escaped with `escapeHtml()` before DOM insertion
- **Input Sanitization**: User inputs are sanitized with `sanitizeInput()` before storage
- No use of `innerHTML` with untrusted data
- No use of `eval()` or `Function()` with user input

### File Upload Security

- MIME type validation (JPEG, PNG, GIF, WebP only)
- File size limit (10MB maximum)
- Images resized to max 800px to prevent storage DoS

### Data Storage

- All data stored locally (IndexedDB/localStorage)
- No server-side storage or transmission
- Export/Import for backup and transfer

### References

- [DOM-based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
- [Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (iOS/macOS)

## License

MIT
