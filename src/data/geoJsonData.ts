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

// Bodh Gaya Block (Gaya, Bihar) Demonstration Datasets
export const BODH_GAYA_PANCHAYATS_GEOJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "bakrour",
      properties: {
        name: "Bakrour",
        hindiName: "बकरौर",
        rainfallMm: 54.0,
        rainProb: 88,
        tempC: 30.2,
        humidity: 84,
        risk: "High",
        confidence: "High",
        elevation: 114,
        description: "Falgu river eastern riparian lowlands; convective enhancement"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [84.990, 24.685],
            [85.020, 24.690],
            [85.025, 24.715],
            [84.995, 24.720],
            [84.985, 24.700],
            [84.990, 24.685]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "mocharim",
      properties: {
        name: "Mocharim",
        hindiName: "मोचरिम",
        rainfallMm: 48.0,
        rainProb: 80,
        tempC: 30.8,
        humidity: 79,
        risk: "Moderate",
        confidence: "High",
        elevation: 111,
        description: "Low-lying alluvial depression near southern canal"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [84.965, 24.665],
            [84.995, 24.670],
            [84.990, 24.695],
            [84.960, 24.690],
            [84.955, 24.675],
            [84.965, 24.665]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "bodh-gaya-rural",
      properties: {
        name: "Bodh Gaya Rural",
        hindiName: "बोधगया ग्रामीण",
        rainfallMm: 41.0,
        rainProb: 74,
        tempC: 31.5,
        humidity: 75,
        risk: "Moderate",
        confidence: "High",
        elevation: 118,
        description: "Central undulating agrarian plain surrounding main township"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [84.965, 24.695],
            [84.990, 24.695],
            [84.995, 24.720],
            [84.960, 24.725],
            [84.950, 24.705],
            [84.965, 24.695]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "itawan",
      properties: {
        name: "Itawan",
        hindiName: "इटवां",
        rainfallMm: 36.0,
        rainProb: 65,
        tempC: 32.1,
        humidity: 71,
        risk: "Low",
        confidence: "High",
        elevation: 125,
        description: "Open western plateau fringe; well-drained sandy loam"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [84.935, 24.680],
            [84.965, 24.685],
            [84.960, 24.720],
            [84.930, 24.715],
            [84.925, 24.695],
            [84.935, 24.680]
          ]
        ]
      }
    }
  ]
};

export const BODH_GAYA_BLOCK_COARSE_GRID: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "bodh-gaya-coarse-cell",
      properties: {
        name: "Bodh Gaya Block Coarse NWP Grid Cell",
        resolution: "12 km x 12 km",
        uniformRainfallMm: 45.0,
        uniformTempC: 31.4,
        note: "Coarse Block-level forecast (Source: 45 mm uniform for all Panchayats)"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [84.920, 24.660],
            [85.030, 24.660],
            [85.030, 24.730],
            [84.920, 24.730],
            [84.920, 24.660]
          ]
        ]
      }
    }
  ]
};

