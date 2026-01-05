import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { theme } from '../../theme';
import { getProfile, UserProfile } from './profileService';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        return;
      }
      setLoading(true);
      try {
        const data = await getProfile(token);
        setProfile(data);
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to load profile';
        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No profile data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.text}>{profile.email}</Text>
      <Text style={styles.text}>Followers: {profile.followersCount}</Text>
      <Text style={styles.text}>Following: {profile.followingCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  name: {
    fontSize: 24,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  text: {
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
});
