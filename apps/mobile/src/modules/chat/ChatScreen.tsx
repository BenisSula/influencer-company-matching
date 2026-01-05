import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { theme } from '../../theme';
import { getChats, ChatMessage } from './chatService';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const data = await getChats('dummy-token');
        setMessages(data);
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to load chats';
        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View style={styles.card}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (messages.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No chats available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messages}
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
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sender: {
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  message: {
    fontFamily: theme.fonts.body,
    fontSize: 14,
    color: theme.colors.primary,
    marginVertical: theme.spacing.xs,
  },
  timestamp: {
    fontFamily: theme.fonts.body,
    fontSize: 12,
    color: theme.colors.secondary,
  },
  text: {
    fontFamily: theme.fonts.body,
    fontSize: 14,
    color: theme.colors.primary,
  },
});
