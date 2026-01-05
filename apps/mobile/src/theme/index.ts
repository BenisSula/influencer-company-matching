import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  ACCENT_COLOR,
  BACKGROUND_COLOR,
} from '../constants/colors';
import { fonts } from './fonts';

export const theme = {
  colors: {
    primary: PRIMARY_COLOR,
    secondary: SECONDARY_COLOR,
    accent: ACCENT_COLOR,
    background: BACKGROUND_COLOR,
  },
  fonts,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};
