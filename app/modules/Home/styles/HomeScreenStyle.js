import { StyleSheet } from 'react-native';
import { verticalScale, Colors } from '../../../theme';
export const cellHeight = verticalScale(200);
const styles = StyleSheet.create({
  container: {
    padding: verticalScale(10)
  },
  cancelRequest: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  plusButton: {
    position: 'absolute',
    height: verticalScale(55),
    width: verticalScale(55),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: verticalScale(15),
    right: verticalScale(15),
    backgroundColor: Colors.green
  },
  cellContainer: {
    height: cellHeight - verticalScale(7.5),
    backgroundColor: Colors.neutral,
    marginBottom: verticalScale(5),
    borderRadius: verticalScale(10)
  }
});

export default styles;
