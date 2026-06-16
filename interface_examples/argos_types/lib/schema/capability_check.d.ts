import { UserCapability } from '../argosApi.js';
export type CapMap = Map<string, 'missing' | 'none' | readonly UserCapability[]>;
