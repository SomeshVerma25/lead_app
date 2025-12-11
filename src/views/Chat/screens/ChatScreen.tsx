import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  Send,
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react-native";
import ChatService, { ChatResponse } from "../../../network/repo/chat/ChatService";
import ChatHeader from "../components/ChatHeader";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const chat = new ChatService();

  const fetchLeads = async (query: string) => {
    const leads: ChatResponse = await chat.getChatCompletion(query);
    return leads;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      type: "user",
      text: input,
    };
    setMessages((prev) => [...prev, newMessage]);

    const query = input;
    setInput("");

    const apiResults: ChatResponse = await fetchLeads(query);

    const resultsMessage = {
      id: Date.now() + 1,
      type: "results",
      leads: apiResults.results,
    };

    setMessages((prev) => [...prev, resultsMessage]);
  };

  const EmptyInitialState = () => (
    <View style={styles.emptyContainer}>
      <MessageCircle size={50} color="#007AFF" />
      <Text style={styles.emptyTitle}>Start a New Chat</Text>
      <Text style={styles.emptySubtitle}>
        Ask something like “show leads in Gurugram” to begin.
      </Text>
    </View>
  );

  const EmptyNoLeadState = () => (
    <View style={styles.emptyContainer}>
      <Search size={50} color="#FF9500" />
      <Text style={styles.emptyTitle}>No Matching Leads Found</Text>
      <Text style={styles.emptySubtitle}>
        Try refining your question by adding location, company, or role.
      </Text>
    </View>
  );

  const LeadCard = ({ item }: any) => (
    <View
      style={[
        styles.leadCard,
        item.matchScore > 80 && { borderColor: "#2ecc71", borderWidth: 2 },
      ]}
    >
      <View style={styles.leadHeader}>
        <Text style={styles.leadName}>{item.name}</Text>

        <View
          style={[
            styles.scoreBadge,
            item.matchScore > 80
              ? { backgroundColor: "#2ecc71" }
              : { backgroundColor: "#3498db" },
          ]}
        >
          <Text style={styles.scoreText}>{item.matchScore}%</Text>
        </View>
      </View>

      <View style={styles.leadRow}>
        <Building2 size={16} color="#555" />
        <Text style={styles.leadDetail}>{item.companyName}</Text>
      </View>

      <View style={styles.leadRow}>
        <Phone size={16} color="#555" />
        <Text style={styles.leadDetail}>{item.mobile}</Text>
      </View>

      <View style={styles.leadRow}>
        <Mail size={16} color="#555" />
        <Text style={styles.leadDetail}>{item.email}</Text>
      </View>

      <View style={styles.leadRow}>
        <MapPin size={16} color="#555" />
        <Text style={styles.leadDetail}>{item.distance} km away</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: any) => {
    if (item.type === "user") {
      return (
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{item.text}</Text>
        </View>
      );
    }

    if (item.type === "results") {
      if (!item.leads || item.leads.length === 0) {
        return <EmptyNoLeadState />;
      }

      return (
        <View style={styles.resultWrapper}>
          <Text style={styles.resultTitle}>Possible Leads</Text>
          {item.leads.map((lead: any) => (
            <LeadCard key={lead.id} item={lead} />
          ))}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent backgroundColor="transparent" />
      <ChatHeader
        onNewChat={() => {
          setMessages([]);
        }}
      />
      {messages.length === 0 ? (
        <EmptyInitialState />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Ask something about leads..."
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Send size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    color: "#1e272e",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 16,
    maxWidth: "75%",
    marginBottom: 10,
  },
  userText: {
    color: "#fff",
    fontSize: 15,
  },

  resultWrapper: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#333",
  },

  leadCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.2,
    borderColor: "#e5e5e5",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  leadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leadName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2c3e50",
  },

  scoreBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "700",
  },

  leadRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  leadDetail: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  inputBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    fontSize: 15,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 12,
  },
});
