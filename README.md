# GRAMCAST

### **Block-level forecasts. Panchayat-level intelligence.**
**Technical Concept: Physics-Guided Adaptive Weather Super-Resolution**  
*Smart India Hackathon (SIH 2026) Project Prototype*

---

## 🌾 Overview

GRAMCAST is a weather intelligence platform designed to convert **coarse Block-level weather forecasts (~12–25 km cells) into actionable Panchayat-level weather intelligence (~1 km)** for Indian agriculture.

### The Problem It Solves:
Official numerical weather prediction (NWP) models (such as IMD GFS/NCUM) treat entire administrative blocks as uniform boxes. In reality, a block contains diverse topography: hills, low-lying river basins, and elevated ridges experience vastly different rainfall amounts, waterlogging risks, and microclimates. 

A farmer cannot base critical field decisions (irrigation pumping, chemical spraying, crop harvesting) on generalized block-level forecasts. **GRAMCAST bridges this spatial resolution gap without requiring the farmer to understand machine learning or GIS.**

---

## 👥 Three Tailored User Experiences

### 1. Farmer (Default Experience — Farmer First)
- **Today's Weather:** Large, clear presentation of Temperature (28°C), Rainfall Expected (12–18 mm), Rain Probability (72%), Humidity & Wind.
- **Plain Language Status:** *"Rain likely today"* — no confusing jargon.
- **7-Day Scan Timeline:** Quick-view horizontal timeline showing daily precipitation, temperatures, and risk pills.
- **Weather Risks:** Plain-language severity badges for *Heavy Rain*, *Waterlogging*, *Heat Stress*, and *Dry Spell*.
- **"What This Weather Means for You":** Direct agricultural advice:
  - 🌱 **Irrigation:** *"Rain is expected today. Irrigation may not be necessary."*
  - 🌾 **Field Work:** *"Complete weeding or land preparation before afternoon rainfall window."*
  - 🧺 **Harvesting:** *"Rain may affect harvested produce. Keep storage protected."*
  - 🚜 **Spraying:** *"Rain may reduce the effectiveness of pesticide/fertilizer. Avoid foliar spraying today."*
- **Multilingual Support:** One-click toggle between English and farmer-friendly Hindi (मौसम, वर्षा, तापमान, आदि).
- **Audio Voice Narrator:** Built-in Speech Synthesis reads today's advisory aloud for rural accessibility.

### 2. Agricultural Officer
- **Spatial Monitoring:** Real-time status across all 24 Panchayats in the block.
- **Risk Counters:** Instant counts of High-Risk (4) and Moderate-Risk (8) Panchayats.
- **Filterable & Sortable Table:** Compare rainfall amounts, risk levels, and confidence scores across Panchayats.
- **Side-by-Side Comparison Tool:** Select 2–3 Panchayats (e.g. valley basin Sukurhutu vs elevated ridge Pithoria) to directly compare microclimate variance and advisory needs.

### 3. Technical User / Admin
- **Forecast Validation:** Quantitative comparison of *Original Block Forecast* vs *GRAMCAST Downscaled* vs *Observed Weather (AWS Station)*.
- **Error Metrics:** MAE, RMSE, Systematic Bias Reduction (62.8%), and Pearson Correlation (r = 0.89).
- **Self-Correction Learning Loop:** Interactive 5-step visual flow (*Forecast → Observation → Residual Detection → Kalman Calibration → Next Forecast*).

---

## 🗺️ Interactive GIS Weather Map

Built with Leaflet.js with authentic geographical coordinates for **Kanke Block (Ranchi District, Jharkhand)**:
- **Panchayat Polygon Boundaries:** Interactive polygons for Kanke (HQ), Sukurhutu, Pithoria, Borea, Arsande, Nagri Rural, Hulhudoo, and Mandra.
- **Layer Switching:** 
  - 💧 Rainfall (Choropleth from light blue to deep navy)
  - 🌡️ Temperature (Isothermal coloring from yellow to orange)
  - 🌫️ Humidity (Moisture saturation index)
  - ⚠️ Weather Risk (Low, Moderate, High risk polygons)
- **Resolution Toggle:** Switch in real time between **Block View (12km Coarse NWP grid)** and **GRAMCAST View (1km Downscaled Panchayats)**.
- **Inspection Card:** Click any Panchayat polygon on the map to trigger a detailed microclimate panel with one-click navigation.

---

## 🔬 Core Visual: Block → Panchayat Super-Resolution

A dedicated interactive visual demonstrating GRAMCAST's core value:
- **Left (Step 1 - Input):** Coarse Block Forecast (12 km x 12 km grid with uniform 8.5 mm rainfall).
- **Center (Engine):** GRAMCAST Downscaling Engine incorporating:
  - SRTM 30m Digital Elevation Model (slope, aspect, elevation lapse rate)
  - INSAT-3DR Thermal Infrared Satellite Radiance (cloud top temperatures)
  - Sentinel-2 NDVI & Soil Moisture Transpiration
  - Local Kalman Filter Error Matrix
- **Right (Step 2 - Output):** Downscaled Panchayat Intelligence (differentiating Sukurhutu 21 mm from Pithoria 10 mm and Kanke 15 mm).

---

## 🎨 Visual Design System

Designed strictly in accordance with **Indian government credibility + modern GIS usability + clean agricultural product design**:
- **Palette:** Deep Navy (`#0f2744`, `#1e3a8a`), Agricultural Green (`#059669`), Warning Amber (`#d97706`), High-Risk Red (`#dc2626`), and clean off-white background (`#f8fafc`).
- **Typography:** Inter & IBM Plex Sans.
- **Restraint:** No neon colors, no futuristic glowing circles, no crypto/glassmorphism clutter, no AI hallucinations.
- **Demo Data Indicator:** Global badge clearly declaring **"PROTOTYPE / DEMONSTRATION DATA"** to preserve scientific integrity.

---

## 💻 Tech Stack & Local Execution

- **Frontend:** React 19, TypeScript, Vite
- **Mapping:** Leaflet GIS
- **Icons:** Lucide React
- **Styling:** Modular CSS Design System & CSS Variables

### Running Locally:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```
Local dev server runs at: `http://localhost:5173/`
