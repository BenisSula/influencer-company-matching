import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, BACKGROUND_COLOR } from '../../constants/colors';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins_700Bold',
  },
});
