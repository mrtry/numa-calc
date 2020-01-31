import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

export default function styleType<T extends ViewStyle | TextStyle | ImageStyle>(
  style: T
): T {
  return style
}