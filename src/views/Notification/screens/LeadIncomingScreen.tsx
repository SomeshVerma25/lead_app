import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
} from "react-native";


interface ViewProp {
    onCloseRequest: () => void,
    data: any
}

const LeadIncomingScreen: React.FC<ViewProp> = ({
    onCloseRequest,
    data
}) => {
    const [timer, setTimer] = useState<number>(10)
    const navigation:any = useNavigation()

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev > 1) return prev - 1;
                onCloseRequest();
                clearInterval(interval);
                return 0;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const onAccept = () => {
        navigation.navigate("LeadDetails", { lead: data })
        onCloseRequest()
    };
    const onReject = () => {
        // Store rejected lead
        onCloseRequest()
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <View style={styles.profileWrapper}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {data.name.charAt(0)}
                        </Text>
                    </View>
                </View>
                <Text style={styles.incomingLabel}>Incoming Lead</Text>
                <Text style={styles.leadName}>{data.name}</Text>
                <Text style={styles.companyName}>{data.companyName}</Text>
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{data.distance}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>{data.source}</Text>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Phone</Text>
                        <Text style={styles.infoValue}>{data.mobile}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Match</Text>
                        <Text style={styles.infoValue}>{data.matchScore}%</Text>
                    </View>
                </View>
                {
                    timer && <Text style={styles.timer}>{`Respond in ${timer > 0 ? timer : '0'} seconds`}</Text>
                }
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.btn, styles.rejectBtn]} onPress={onReject}>
                    <Text style={styles.btnTextReject}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.acceptBtn]} onPress={onAccept}>
                    <Text style={styles.btnTextAccept}>Accept</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Swipe up to ignore →</Text>
            </View>
        </View>
    );
};

export default LeadIncomingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 28 : 50,
        backgroundColor: "#F5F7FF",
        rowGap: 52,
        justifyContent: "center",
        borderRadius: 24,
    },
    header: {
        alignItems: "center",
        paddingHorizontal: 22,
    },

    /** PROFILE */
    profileWrapper: {
        marginBottom: 14,
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 100,
        backgroundColor: "#D9E2FF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    avatarText: {
        fontSize: 34,
        fontWeight: "800",
        color: "#1C2C54",
    },

    incomingLabel: {
        color: "#5A6AA5",
        fontSize: 14,
        marginBottom: 4,
        fontWeight: "500",
    },
    leadName: {
        color: "#1C2C54",
        fontSize: 28,
        fontWeight: "800",
        textAlign: "center",
    },
    companyName: {
        color: "#4C5E8A",
        fontSize: 16,
        marginTop: 3,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 8,
    },
    metaText: {
        color: "#5D75A8",
        fontSize: 14,
    },
    metaDot: {
        color: "#5D75A8",
        fontSize: 14,
    },
    infoRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 24,
    },
    infoBox: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 12,
        elevation: 3,
    },
    infoLabel: {
        color: "#7D8AB5",
        fontSize: 12,
        fontWeight: "500",
    },
    infoValue: {
        color: "#1C2C54",
        fontSize: 17,
        fontWeight: "700",
        marginTop: 4,
    },
    timer: {
        marginTop: 18,
        color: "#7D8AB5",
        fontSize: 14,
    },
    actions: {
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    btn: {
        flex: 1,
        paddingVertical: 14,
        marginHorizontal: 8,
        borderRadius: 12,
        alignItems: "center",
    },
    rejectBtn: {
        backgroundColor: "#FFEBEB",
    },
    acceptBtn: {
        backgroundColor: "#00C96E",
    },
    btnTextReject: {
        color: "#E03131",
        fontSize: 16,
        fontWeight: "700",
    },
    btnTextAccept: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "800",
    },
    footer: {
        paddingBottom: 30,
        alignItems: "center",
    },
    footerText: {
        color: "#7D8AB5",
        fontSize: 12,
    },
});
