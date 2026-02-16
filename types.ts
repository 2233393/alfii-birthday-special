
export enum Stage {
  OPENING = 'OPENING',
  BUILD_UP = 'BUILD_UP',
  NAME_REVEAL = 'NAME_REVEAL',
  GIFT_SUSPENSE = 'GIFT_SUSPENSE',
  MAGICAL_EXPLOSION = 'MAGICAL_EXPLOSION',
  LOVE_MESSAGE = 'LOVE_MESSAGE',
  DREAMY_ENDING = 'DREAMY_ENDING'
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}
