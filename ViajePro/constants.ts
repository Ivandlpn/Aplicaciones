
import { DefectElement, DefectLevel } from './types';

export const DEFECT_CATALOG: DefectElement[] = [
  {
    element: 'Carril',
    defects: [
      { name: 'Estado de carril', level: DefectLevel.IAL },
      { name: 'Cabeza de carril. Soldaduras', level: DefectLevel.IAL },
    ],
  },
  {
    element: 'Traviesas Hormigón o Bibloque',
    defects: [{ name: 'Estado de la traviesa', level: DefectLevel.IAL }],
  },
  {
    element: 'Traviesas Madera',
    defects: [{ name: 'Estado de la traviesa', level: DefectLevel.IAL }],
  },
  {
    element: 'Balasto',
    defects: [
      { name: 'Contaminación de balasto', level: DefectLevel.IAL },
      { name: 'Insuficiencia de balasto', level: DefectLevel.IAL },
      { name: 'Exceso de balasto sobre traviesas', level: DefectLevel.IAL },
      { name: 'Presencia de vegetación', level: DefectLevel.IAL },
    ],
  },
  {
    element: 'Geometría de vía',
    defects: [
      { name: 'Defecto alineación planta (garrotes, ripados)', level: DefectLevel.IAL },
      { name: 'Defecto nivelación alzado (Bache)', level: DefectLevel.IAL },
    ],
  },
  {
    element: 'Cerramientos',
    defects: [
      { name: 'Mal estado general', level: DefectLevel.IAL },
      { name: 'Mal estado puntual', level: DefectLevel.IL },
    ],
  },
  {
    element: 'Limpieza del entorno ferroviario',
    defects: [
      { name: 'Obstáculos en la zona de peligro', level: DefectLevel.IAL },
      { name: 'Obstáculos en la zona de seguridad', level: DefectLevel.IL },
      { name: 'Presencia de vegetación en márgenes invadiendo gálibo', level: DefectLevel.IL },
    ],
  },
   {
    element: 'Cartelones',
    defects: [
        { name: 'Mala colocación', level: DefectLevel.IAL },
        { name: 'Falta de señales o fuera de servicio', level: DefectLevel.IL }
    ]
   },
   {
    element: 'Desmontes',
    defects: [
        { name: 'Deficiente estado apreciable', level: DefectLevel.IAL }
    ]
   },
   {
    element: 'Puentes',
    defects: [
        { name: 'Deficiente estado apreciable', level: DefectLevel.IAL }
    ]
   },
   {
    element: 'Túneles',
    defects: [
        { name: 'Deficiente estado apreciable', level: DefectLevel.IAL }
    ]
   }
];
