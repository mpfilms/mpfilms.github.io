import { Content, EN } from './content.en';
import { DE } from './content.de';
import { ES } from './content.es';
import { Lang } from './pages';

export type { Content } from './content.en';

export const CONTENT: Record<Lang, Content> = { en: EN, de: DE, es: ES };
