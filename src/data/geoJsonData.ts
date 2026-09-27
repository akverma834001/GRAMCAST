// Realistic GeoJSON feature collection for Kanke Block Panchayats and Block Boundary

export const KANKE_PANCHAYATS_GEOJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "kanke-hq",
      properties: {
        name: "Kanke (HQ)",
        hindiName: "कांके (मुख्यालय)",
        rainfallMm: 15.0,
        rainProb: 72,
        tempC: 28.0,
        humidity: 78,
        risk: "Moderate",
        confidence: "Moderate",
        elevation: 628,
        description: "Plateau slope near Kanke reservoir"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.305, 23.420],
            [85.335, 23.425],
            [85.340, 23.450],
            [85.315, 23.455],
            [85.300, 23.435],
            [85.305, 23.420]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "sukurhutu",
      properties: {
        name: "Sukurhutu",
        hindiName: "सुकुरहुटू",
        rainfallMm: 21.0,
        rainProb: 84,
        tempC: 27.5,
        humidity: 84,
        risk: "High",
        confidence: "High",
        elevation: 614,
        description: "Low-lying valley basin with waterlogging vulnerability"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.290, 23.450],
            [85.315, 23.455],
            [85.320, 23.480],
            [85.295, 23.485],
            [85.275, 23.465],
            [85.290, 23.450]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "pithoria",
      properties: {
        name: "Pithoria",
        hindiName: "पिठोरिया",
        rainfallMm: 10.0,
        rainProb: 65,
        tempC: 26.2,
        humidity: 74,
        risk: "Low",
        confidence: "High",
        elevation: 672,
        description: "Elevated northern plateau ridge, rapid drainage"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.280, 23.490],
            [85.315, 23.495],
            [85.325, 23.535],
            [85.285, 23.540],
            [85.265, 23.510],
            [85.280, 23.490]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "borea",
      properties: {
        name: "Borea",
        hindiName: "बोड़ेया",
        rainfallMm: 17.0,
        rainProb: 76,
        tempC: 28.4,
        humidity: 80,
        risk: "Moderate",
        confidence: "High",
        elevation: 622,
        description: "Riparian zone along Jumar river tributary"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.335, 23.410],
            [85.365, 23.415],
            [85.360, 23.445],
            [85.335, 23.440],
            [85.325, 23.420],
            [85.335, 23.410]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "arsande",
      properties: {
        name: "Arsande",
        hindiName: "अरसंडे",
        rainfallMm: 18.5,
        rainProb: 78,
        tempC: 27.8,
        humidity: 79,
        risk: "Moderate",
        confidence: "Moderate",
        elevation: 635,
        description: "Intensive agricultural belt with high moisture retention"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.315, 23.455],
            [85.340, 23.450],
            [85.355, 23.475],
            [85.330, 23.485],
            [85.315, 23.455]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "nagri-rural",
      properties: {
        name: "Nagri Rural",
        hindiName: "नगड़ी ग्रामीण",
        rainfallMm: 23.5,
        rainProb: 86,
        tempC: 27.2,
        humidity: 85,
        risk: "High",
        confidence: "Moderate",
        elevation: 648,
        description: "Western elevated plateau catchment with cloudburst sensitivity"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.250, 23.410],
            [85.290, 23.415],
            [85.295, 23.445],
            [85.260, 23.450],
            [85.240, 23.430],
            [85.250, 23.410]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "hulhudoo",
      properties: {
        name: "Hulhudoo",
        hindiName: "हुलहुडू",
        rainfallMm: 22.0,
        rainProb: 81,
        tempC: 27.4,
        humidity: 83,
        risk: "High",
        confidence: "Limited",
        elevation: 618,
        description: "Low-lying southern border basin"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.275, 23.380],
            [85.315, 23.385],
            [85.310, 23.415],
            [85.270, 23.410],
            [85.260, 23.395],
            [85.275, 23.380]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "mandra",
      properties: {
        name: "Mandra",
        hindiName: "मांदरा",
        rainfallMm: 9.0,
        rainProb: 45,
        tempC: 28.5,
        humidity: 72,
        risk: "Low",
        confidence: "Moderate",
        elevation: 655,
        description: "Well drained eastern plateau ridge"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.345, 23.475],
            [85.375, 23.480],
            [85.370, 23.515],
            [85.335, 23.510],
            [85.345, 23.475]
          ]
        ]
      }
    }
  ]
};

// Coarse Block Grid overlay (12km x 12km) demonstrating coarse input
export const KANKE_BLOCK_COARSE_GRID: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "coarse-cell-1",
      properties: {
        name: "Kanke Block Coarse NWP Cell A",
        resolution: "12 km x 12 km",
        uniformRainfallMm: 8.5,
        uniformTempC: 29.2,
        note: "Uniform block-level numerical weather prediction (NWP) model output"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.240, 23.380],
            [85.380, 23.380],
            [85.380, 23.460],
            [85.240, 23.460],
            [85.240, 23.380]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "coarse-cell-2",
      properties: {
        name: "Kanke Block Coarse NWP Cell B",
        resolution: "12 km x 12 km",
        uniformRainfallMm: 9.0,
        uniformTempC: 28.8,
        note: "Uniform block-level NWP output (Northern sector)"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.240, 23.460],
            [85.380, 23.460],
            [85.380, 23.550],
            [85.240, 23.550],
            [85.240, 23.460]
          ]
        ]
      }
    }
  ]
};
