import { leadsData } from "../../../utils/leads";

export interface Lead {
  id: number;
  name: string;
  mobile: string;
  email: string;
  companyName: string;
  location: {
    lat: number;
    lng: number;
  };
  matchScore: number;
}
export interface ChatResponse {
  query: string;
  results: Array<Lead>;
}

export default class ChatService {
  private leads: Lead[];

  constructor() {
    this.leads = leadsData
  }

  async getChatCompletion(message: string): Promise<ChatResponse> {
    console.log("new chat--->", message);
    const userLocation = { lat: 28.4595, lng: 77.0266 };
    const filtered = this.filterLeads(message);
    const computedLeads = filtered.map((lead) => {
      const distance = this.calculateDistance(
        userLocation.lat,
        userLocation.lng,
        lead.location.lat,
        lead.location.lng
      );
      const matchScore = this.calculateMatchScore(lead, message, distance);
      return {
        ...lead,
        distance: Number(distance.toFixed(2)),
        matchScore,
      };
    });
    const sorted = computedLeads.sort((a, b) => b.matchScore - a.matchScore);
    return {
      query: message,
      results: sorted,
    };
  }
  
  private filterLeads(query: string): Lead[] {
    query = query.toLowerCase();

    if (query.includes("nearby") || query.includes("close") || query.includes("distance")) {
      return this.leads;
    }

    return this.leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.companyName.toLowerCase().includes(query)
    );
  }

  private calculateMatchScore(lead: Lead, query: string, distance: number): number {
    let score = 0;
    if (distance <= 2) score += 40;
    else if (distance <= 5) score += 30;
    else if (distance <= 10) score += 20;
    else score += 10;

    // keyword scoring
    if (query.toLowerCase().includes(lead.name.toLowerCase())) score += 25;
    if (query.toLowerCase().includes(lead.companyName.toLowerCase())) score += 25;

    // base score
    score += 10;

    return Math.min(score, 100);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number) {
    return (value * Math.PI) / 180;
  }
}
