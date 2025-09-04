
export enum DefectLevel {
  IAL = 'IAL',
  IL = 'IL',
  AL = 'AL',
}

export interface Defect {
  name: string;
  level: DefectLevel;
}

export interface DefectElement {
  element: string;
  defects: Defect[];
}

export interface Anomaly {
  id: string;
  element: string;
  defect: string;
  level: DefectLevel;
  pk: string;
  notes: string;
  photo?: string; // base64 string
  location?: {
    lat: number;
    lng: number;
  };
}

export interface CabinTrip {
  id: string;
  code: string;
  line: string;
  track: string;
  date: string;
  technician: string;
  pkStart: string;
  pkEnd: string;
  anomalies: Anomaly[];
  aiSummary?: string;
}