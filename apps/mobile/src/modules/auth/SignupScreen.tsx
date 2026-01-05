import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { theme } from '../../theme';
import { signupUser } from './authService';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile } from '../profile/profileService';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const data = await signupUser({ name, email, password });
      // Handle different response formats
      const token = data.token || data.accessToken || '';
      const userProfile: UserProfile = data.user || {
        id: data.id || '',
        name: data.name || name,
        email: data.email || email,
        followersCount: data.followersCount || 0,
        followingCount: data.followingCount || 0,
      };
      if (token) {
        login(token, userProfile);
        Alert.alert('Success', `Account created for ${userProfile.name}`);
      } else {
        Alert.alert('Error', 'Invalid response from server');
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Signup failed';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Signing up...' : 'Signup'}
        onPress={handleSignup}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    backgroundColor: '#FFFFFF',
  },
});
