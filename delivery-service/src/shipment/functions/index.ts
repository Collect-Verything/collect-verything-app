import { DeliveryType } from '@prisma/client';

export const toDeliveryType = (input: string): DeliveryType => {
  const s = input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
  if (s.includes('point') && s.includes('relais')) return DeliveryType.Point_Relais;
  return DeliveryType.Shop;
};
