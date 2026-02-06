const colorCodes = {
    0: { name: "Black", hex: "#000000" },
    1: { name: "Brown", hex: "#964B00" },
    2: { name: "Red", hex: "#FF0000" },
    3: { name: "Orange", hex: "#FFA500" },
    4: { name: "Yellow", hex: "#FFFF00" },
    5: { name: "Green", hex: "#008000" },
    6: { name: "Blue", hex: "#0000FF" },
    7: { name: "Violet", hex: "#8F00FF" },
    8: { name: "Gray", hex: "#808080" },
    9: { name: "White", hex: "#FFFFFF" },
    tolerance: {
        1: { name: "Brown ±1%", hex: "#964B00" },
        2: { name: "Red ±2%", hex: "#FF0000" },
        5: { name: "Gold ±5%", hex: "#FFD700" },
        10: { name: "Silver ±10%", hex: "#C0C0C0" }
    }
};

// Function to generate color code from resistor value
function generateColorCode() {
    const resistorValue = parseInt(document.getElementById("resistorValue").value);

    if (isNaN(resistorValue) || resistorValue < 1) {
        alert("Please enter a valid resistor value.");
        return;
    }

    let digits = resistorValue.toString();
    let band1 = parseInt(digits[0]);
    let band2 = parseInt(digits[1] || 0);
    let multiplier = digits.length - 2;

    const color1 = colorCodes[band1];
    const color2 = colorCodes[band2];
    const multiplierColor = colorCodes[multiplier + 1];

    document.getElementById("resistorResult").innerHTML = `
        <div>
            <p><strong>Color Bands:</strong></p>
            <div style="background-color:${color1.hex}; width:50px; height:50px; display:inline-block;"></div>
            <span>${color1.name}</span>
            <div style="background-color:${color2.hex}; width:50px; height:50px; display:inline-block;"></div>
            <span>${color2.name}</span>
            <div style="background-color:${multiplierColor.hex}; width:50px; height:50px; display:inline-block;"></div>
            <span>${multiplierColor.name}</span>
        </div>`;
}

// Function to generate resistor value from 4 color bands
function generateResistorValue() {
    const color1 = parseInt(document.getElementById("color1").value);
    const color2 = parseInt(document.getElementById("color2").value);
    const multiplier = parseInt(document.getElementById("color3").value);
    const tolerance = parseInt(document.getElementById("color4").value);

    const resistorValue = (color1 * 10 + color2) * multiplier;

    const color1Details = colorCodes[color1];
    const color2Details = colorCodes[color2];
    const multiplierColorDetails = colorCodes[multiplier / Math.pow(10, (Math.log10(multiplier)))];
    const toleranceColorDetails = colorCodes.tolerance[tolerance];

    document.getElementById("resistorResult").innerHTML = `
        <div>
            <p><strong>Resistor Value:</strong> ${resistorValue} Ω</p>
            <p><strong>Selected Colors:</strong></p>
            <div style="background-color:${color1Details.hex}; width:50px; height:50px; display:inline-block;"></div>
            <span>${color1Details.name}</span>
            <div style="background-color:${color2Details.hex}; width:50px; height:50px; display:inline-block;"></div>
            <span>${color2Details.name}</span>
            <div style="background-color:${multiplierColorDetails.hex}; width:50px; height:50px; display:inline-block;"></div>
            <span>${multiplierColorDetails.name}</span>
            <div style="background-color:${toleranceColorDetails.hex}; width:50px; height:50px; display:inline-block;"></div>
            <span>${toleranceColorDetails.name}</span>
        </div>`;
}

// ===================================================================
// CAMERA SCANNER
// ===================================================================

let cameraStream = null;

// Reference colors in LAB space for distance matching
// Each entry: { name, bandValue, multiplierValue, toleranceValue, rgb: [r,g,b] }
const BAND_COLORS = [
    { name: "Black",  bandVal: 0, multVal: 1,           tolVal: null, rgb: [0, 0, 0] },
    { name: "Brown",  bandVal: 1, multVal: 10,          tolVal: 1,    rgb: [150, 75, 0] },
    { name: "Red",    bandVal: 2, multVal: 100,         tolVal: 2,    rgb: [255, 0, 0] },
    { name: "Orange", bandVal: 3, multVal: 1000,        tolVal: null, rgb: [255, 165, 0] },
    { name: "Yellow", bandVal: 4, multVal: 10000,       tolVal: null, rgb: [255, 255, 0] },
    { name: "Green",  bandVal: 5, multVal: 100000,      tolVal: null, rgb: [0, 128, 0] },
    { name: "Blue",   bandVal: 6, multVal: 1000000,     tolVal: null, rgb: [0, 0, 255] },
    { name: "Violet", bandVal: 7, multVal: 10000000,    tolVal: null, rgb: [143, 0, 255] },
    { name: "Gray",   bandVal: 8, multVal: 100000000,   tolVal: null, rgb: [128, 128, 128] },
    { name: "White",  bandVal: 9, multVal: 1000000000,  tolVal: null, rgb: [255, 255, 255] },
    { name: "Gold",   bandVal: null, multVal: 0.1,      tolVal: 5,    rgb: [218, 165, 32] },
    { name: "Silver", bandVal: null, multVal: 0.01,     tolVal: 10,   rgb: [192, 192, 192] },
];

// --- Color space conversion: RGB -> CIE LAB ---
function rgbToLab(r, g, b) {
    // Normalize to 0-1
    let rr = r / 255, gg = g / 255, bb = b / 255;
    // sRGB gamma
    rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
    gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
    bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;
    // XYZ (D65)
    let x = (rr * 0.4124564 + gg * 0.3575761 + bb * 0.1804375) / 0.95047;
    let y = (rr * 0.2126729 + gg * 0.7151522 + bb * 0.0721750);
    let z = (rr * 0.0193339 + gg * 0.1191920 + bb * 0.9503041) / 1.08883;
    const f = t => t > 0.008856 ? Math.cbrt(t) : (7.787 * t + 16 / 116);
    x = f(x); y = f(y); z = f(z);
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function colorDistanceLab(lab1, lab2) {
    const dL = lab1[0] - lab2[0];
    const da = lab1[1] - lab2[1];
    const db = lab1[2] - lab2[2];
    return Math.sqrt(dL * dL + da * da + db * db);
}

// Precompute LAB values for reference colors
const BAND_COLORS_LAB = BAND_COLORS.map(c => ({
    ...c,
    lab: rgbToLab(c.rgb[0], c.rgb[1], c.rgb[2])
}));

function classifyColor(r, g, b) {
    const lab = rgbToLab(r, g, b);
    let bestDist = Infinity;
    let best = BAND_COLORS_LAB[0];
    for (const ref of BAND_COLORS_LAB) {
        const d = colorDistanceLab(lab, ref.lab);
        if (d < bestDist) { bestDist = d; best = ref; }
    }
    return { ...best, distance: bestDist };
}

// --- Resistor body detection helpers ---
// Typical resistor bodies are beige/tan/cream. We detect the body color
// as the most frequent hue along our scan line, then look for bands that
// differ significantly from it.

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }
    return [h * 360, s, l];
}

// --- Main scan logic ---
function scanResistorBands(canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const w = canvas.width, h = canvas.height;

    // Sample a horizontal band in the center (20% height, centered)
    const bandH = Math.round(h * 0.20);
    const y0 = Math.round(h / 2 - bandH / 2);
    const imgData = ctx.getImageData(0, y0, w, bandH);

    // Average each column across the vertical band to reduce noise
    const colColors = [];
    for (let x = 0; x < w; x++) {
        let rSum = 0, gSum = 0, bSum = 0;
        for (let row = 0; row < bandH; row++) {
            const idx = (row * w + x) * 4;
            rSum += imgData.data[idx];
            gSum += imgData.data[idx + 1];
            bSum += imgData.data[idx + 2];
        }
        colColors.push([
            Math.round(rSum / bandH),
            Math.round(gSum / bandH),
            Math.round(bSum / bandH)
        ]);
    }

    // Classify every column
    const classified = colColors.map(([r, g, b]) => classifyColor(r, g, b));

    // Detect the resistor body: find the most frequent classified color
    // that is NOT a strong saturated color (body is usually beige/tan = close to brown/orange/white)
    // Simple approach: find runs of same color and the longest run is likely the body
    const runs = [];
    let runStart = 0;
    for (let i = 1; i <= classified.length; i++) {
        if (i === classified.length || classified[i].name !== classified[runStart].name) {
            runs.push({ name: classified[runStart].name, start: runStart, len: i - runStart, color: classified[runStart] });
            runStart = i;
        }
    }

    // Body detection: find the color with the most total pixels
    const colorPixelCount = {};
    for (const r of runs) {
        colorPixelCount[r.name] = (colorPixelCount[r.name] || 0) + r.len;
    }
    // The body is usually the most frequent color
    let bodyColor = Object.entries(colorPixelCount).sort((a, b) => b[1] - a[1])[0][0];

    // Filter out very short runs (noise) — min width is 1.5% of image width
    const minBandWidth = Math.round(w * 0.015);
    const significantRuns = runs.filter(r => r.len >= minBandWidth);

    // Get bands that are NOT the body color
    const bandRuns = significantRuns.filter(r => r.name !== bodyColor);

    // If we got too few bands, try: maybe the body was detected wrong.
    // Try using the second-most-frequent color as body instead
    if (bandRuns.length < 3 && Object.keys(colorPixelCount).length > 1) {
        const sorted = Object.entries(colorPixelCount).sort((a, b) => b[1] - a[1]);
        if (sorted.length > 1) {
            const altBody = sorted[1][0];
            const altBands = significantRuns.filter(r => r.name !== altBody);
            if (altBands.length >= 3) {
                bodyColor = altBody;
                bandRuns.length = 0;
                altBands.forEach(b => bandRuns.push(b));
            }
        }
    }

    // Merge adjacent runs of the same color (they may have been split by noise)
    const merged = [];
    for (const band of bandRuns) {
        if (merged.length > 0 && merged[merged.length - 1].name === band.name &&
            band.start - (merged[merged.length - 1].start + merged[merged.length - 1].len) < minBandWidth * 2) {
            merged[merged.length - 1].len = band.start + band.len - merged[merged.length - 1].start;
        } else {
            merged.push({ ...band });
        }
    }

    return { bands: merged, bodyColor, allRuns: significantRuns };
}

function formatValue(val) {
    if (val >= 1e9) return (val / 1e9).toFixed(val % 1e9 ? 1 : 0) + ' GΩ';
    if (val >= 1e6) return (val / 1e6).toFixed(val % 1e6 ? 1 : 0) + ' MΩ';
    if (val >= 1e3) return (val / 1e3).toFixed(val % 1e3 ? 1 : 0) + ' kΩ';
    return val + ' Ω';
}

// Apply detected bands to the select dropdowns and calculate
function applyDetectedBands(bands) {
    if (bands.length < 3) return false;

    // Band 1 (digit), Band 2 (digit), Band 3 (multiplier), optional Band 4 (tolerance)
    const b1 = bands[0].color;
    const b2 = bands[1].color;
    const b3 = bands[2].color;
    const b4 = bands.length >= 4 ? bands[3].color : null;

    // Set Band 1 dropdown
    if (b1.bandVal !== null) {
        document.getElementById('color1').value = b1.bandVal;
    }
    // Set Band 2 dropdown
    if (b2.bandVal !== null) {
        document.getElementById('color2').value = b2.bandVal;
    }
    // Set Multiplier dropdown
    if (b3.multVal !== null) {
        document.getElementById('color3').value = b3.multVal;
    }
    // Set Tolerance dropdown
    if (b4 && b4.tolVal !== null) {
        document.getElementById('color4').value = b4.tolVal;
    }

    // Calculate and display
    generateResistorValue();
    return true;
}

// --- Camera functions ---
async function startCamera() {
    const video = document.getElementById('camera-feed');
    const statusEl = document.getElementById('scan-status');

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        video.srcObject = cameraStream;
        await video.play();

        document.getElementById('btn-start-cam').style.display = 'none';
        document.getElementById('btn-capture').style.display = '';
        document.getElementById('btn-stop-cam').style.display = '';
        document.getElementById('camera-container').classList.add('active');
        statusEl.textContent = 'Position the resistor horizontally along the guide line, then tap Capture.';
        statusEl.className = 'scan-hint';
    } catch (err) {
        statusEl.textContent = 'Camera access denied or not available: ' + err.message;
        statusEl.className = 'scan-error';
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        cameraStream = null;
    }
    const video = document.getElementById('camera-feed');
    video.srcObject = null;
    document.getElementById('btn-start-cam').style.display = '';
    document.getElementById('btn-capture').style.display = 'none';
    document.getElementById('btn-stop-cam').style.display = 'none';
    document.getElementById('camera-container').classList.remove('active');
    document.getElementById('scan-status').textContent = '';
    document.getElementById('scan-status').className = '';
    document.getElementById('detected-bands').innerHTML = '';
}

function captureAndScan() {
    const video = document.getElementById('camera-feed');
    const canvas = document.getElementById('scan-canvas');
    const statusEl = document.getElementById('scan-status');
    const bandsEl = document.getElementById('detected-bands');

    // Draw video frame to canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Show the captured frame
    canvas.style.display = 'block';
    video.style.display = 'none';

    // Run scan
    const result = scanResistorBands(canvas);
    const bands = result.bands;

    if (bands.length >= 3) {
        // Show detected bands
        let html = '<div class="detected-bands-label">Detected Bands:</div><div class="band-chips">';
        bands.forEach((b, i) => {
            const labels = ['1st Digit', '2nd Digit', 'Multiplier', 'Tolerance'];
            const label = labels[i] || 'Extra';
            html += `<div class="band-chip">
                <div class="band-swatch" style="background:${b.color.hex || '#888'}; ${b.name === 'Black' ? 'border:1px solid #555;' : ''}"></div>
                <div class="band-info"><span class="band-name">${b.name}</span><span class="band-role">${label}</span></div>
            </div>`;
        });
        html += '</div>';
        bandsEl.innerHTML = html;

        // Apply to dropdowns and calculate
        applyDetectedBands(bands);

        statusEl.textContent = 'Detected ' + bands.length + ' bands. Value calculated below.';
        statusEl.className = 'scan-success';
    } else {
        bandsEl.innerHTML = '';
        statusEl.textContent = 'Could not detect enough bands (' + bands.length + ' found). Try better lighting or positioning.';
        statusEl.className = 'scan-error';
    }

    // Allow retaking
    document.getElementById('btn-capture').textContent = 'Retake';
    document.getElementById('btn-capture').onclick = function () {
        canvas.style.display = 'none';
        video.style.display = 'block';
        bandsEl.innerHTML = '';
        statusEl.textContent = 'Position the resistor horizontally along the guide line, then tap Capture.';
        statusEl.className = 'scan-hint';
        this.textContent = 'Capture & Scan';
        this.onclick = captureAndScan;
    };
}

// --- Init camera controls ---
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-start-cam').addEventListener('click', startCamera);
    document.getElementById('btn-capture').addEventListener('click', captureAndScan);
    document.getElementById('btn-stop-cam').addEventListener('click', stopCamera);
});
