import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../GlobalSettings/ThemeContext';

export default function StyledText({ children, style }) {
  const { isDarkMode } = useTheme();
  return (
    <Text style={[style, isDarkMode && { color: '#fff' }]}>{children}</Text>
  );
}
