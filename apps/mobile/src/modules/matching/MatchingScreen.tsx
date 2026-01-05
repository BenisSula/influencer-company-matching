import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { theme } from '../../theme';
import { getMatches, MatchItem } from './matchingService';
import { useAuth } from '../../contexts/AuthContext';

export default function MatchingScreen() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchMatches = async () => {
      if (!token) {
        return;
      }
      setLoading(true);
      try {
        const data = await getMatches(token);
        setMatches(data);
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to load matches';
        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [token]);

  const renderItem = ({ item }: { item: MatchItem }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
      {item.followers !== undefined && <Text style={styles.text}>Followers: {item.followers}</Text>}
      {item.targetAudience && <Text style={styles.text}>Audience: {item.targetAudience}</Text>}
      {item.costPerFollower !== undefined && (
        <Text style={styles.text}>Cost/Follower: ${item.costPerFollower}</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No matches available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={matches}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  list: {
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: {
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  type: {
    fontFamily: theme.fonts.body,
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  text: {
    fontFamily: theme.fonts.body,
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
});
