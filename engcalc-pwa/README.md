# Engineering Calculators PWA

A collection of 23 mechanical engineering calculators for tribology, bearings, fatigue, shaft design, and more. Runs as a standalone PWA with offline support.

Many calculators are validated against [werktuigbouw.nl](https://www.werktuigbouw.nl) reference implementations.

## Calculators

### Contact Mechanics

| Calculator | Description |
|---|---|
| Hertzian Point Contact | Contact pressure and deformation for ball-on-flat / ball-on-ball (ISO) |
| Hertzian Line Contact | Contact half-width and pressure for parallel cylinders |
| Gear Contact Stress (AGMA) | Hertzian contact stress on gear teeth per AGMA standard |

### Rolling Bearings

| Calculator | Description |
|---|---|
| Bearing Life (L10) | Basic rating life per ISO 281 |
| Equivalent Bearing Load | Equivalent static and dynamic bearing load for deep groove ball bearings |

### Shaft-Hub Connections

| Calculator | Description |
|---|---|
| Interference Fits | Press/shrink fit: contact pressure, stresses, assembly force, torque capacity |
| Shaft Key Design | Bearing pressure and shear stress in parallel key connections |
| Self-Locking Cone Fit | Taper cone self-locking condition and torque capacity |

### Fasteners & Bolts

| Calculator | Description |
|---|---|
| Bolt Tightening Torque (VDI 2230) | Tightening torque to preload a bolt with thread and head friction |
| Max Tightening Torque (VDI 2230) | Maximum torque at bolt yield |
| Thread Stripping Strength | Internal/external thread stripping load |
| Max Tensile Load (Bolt) | Maximum tensile load capacity |
| Metric ISO Thread Table | Reference table for standard metric thread dimensions |

### Fatigue Strength

| Calculator | Description |
|---|---|
| Drive Shaft Fatigue (Bending) | Fatigue safety factor for rotating shafts under bending |
| Reliability Factor Table | Reliability correction factors for fatigue life |

### Fluid Flow & Lubrication

| Calculator | Description |
|---|---|
| Pipe Flow Pressure Drop | Darcy-Weisbach pressure drop with Moody friction factor |
| Compressed Air Pipe Flow | Pressure drop in compressed air piping systems |
| Pressure-Viscosity (Barus/Roelands) | Viscosity at elevated pressure for lubricants |

### Dynamics & Vibration

| Calculator | Description |
|---|---|
| Viscous Damping | Damped natural frequency, damping ratio, and logarithmic decrement |

### Power Transmission

| Calculator | Description |
|---|---|
| Drive Shaft Design | Minimum shaft diameter from torque and allowable shear stress |
| Shaft Bending Stress | Bending stress and deflection for simply supported shafts |
| Helical Spring Design | Spring rate, shear stress, and solid height for compression springs |

### Material Properties

| Calculator | Description |
|---|---|
| Material Properties Reference | UTS, yield strength, and elongation for common engineering materials |

## Features

- Sidebar navigation with search and category grouping
- Real-time calculation as inputs change
- Formula display showing the underlying equations
- Color-coded categories for quick identification
- PWA installable with offline caching via service worker
- Responsive layout with collapsible sidebar on mobile
- Dark zinc/amber theme matching the main Maker Portfolio

## Tech Stack

- Vanilla JavaScript (no framework dependencies)
- CSS custom properties for theming
- Service worker for offline support
- Web App Manifest for PWA install
