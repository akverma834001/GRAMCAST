export interface LocationTree {
  [state: string]: {
    [district: string]: {
      [block: string]: string[];
    };
  };
}

export const LOCATIONS_DATA: LocationTree = {
  "Jharkhand": {
    "Ranchi": {
      "Kanke": [
        "Kanke (HQ)",
        "Sukurhutu",
        "Pithoria",
        "Borea",
        "Arsande",
        "Nagri Rural",
        "Hulhudoo",
        "Mandra"
      ],
      "Ormanjhi": [
        "Ormanjhi Central",
        "Dahu",
        "Gagari",
        "Irba"
      ],
      "Namkum": [
        "Namkum Bazar",
        "Rajaulatu",
        "Sidroll",
        "Lalgutwa"
      ],
      "Mandar": [
        "Mandar Khas",
        "Bishakhatanga",
        "Karkatta"
      ]
    },
    "Hazaribagh": {
      "Barhi": [
        "Barhi East",
        "Barhi West",
        "Konra",
        "Karanjia"
      ],
      "Ichak": [
        "Ichak North",
        "Barkakhurd",
        "Kura"
      ]
    },
    "East Singhbhum": {
      "Ghatshila": [
        "Ghatshila Proper",
        "Kashida",
        "Dhalbhumgarh"
      ]
    }
  },
  "Bihar": {
    "Patna": {
      "Danapur": [
        "Danapur Nizamat",
        "Khagual Rural",
        "Usri"
      ],
      "Bihta": [
        "Bihta Purvi",
        "Katesar",
        "Lai"
      ]
    },
    "Gaya": {
      "Bodh Gaya": [
        "Bakrour",
        "Mocharim",
        "Bodh Gaya Rural",
        "Itawan"
      ]
    }
  },
  "Maharashtra": {
    "Pune": {
      "Baramati": [
        "Baramati Gramin",
        "Malegaon Budruk",
        "Katewadi"
      ],
      "Haveli": [
        "Uruli Kanchan",
        "Wagholi Gramin",
        "Loni Kalbhor"
      ]
    }
  },
  "Odisha": {
    "Cuttack": {
      "Salepur": [
        "Salepur Shasan",
        "Machhagan",
        "Kusunpur"
      ]
    }
  }
};

export const DEFAULT_LOCATION = {
  state: "Jharkhand",
  district: "Ranchi",
  block: "Kanke",
  panchayat: "Kanke (HQ)"
};
