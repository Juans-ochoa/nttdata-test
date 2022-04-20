export interface Filter {
  name: string;
  locationId: number;
  minClanLevel: number;
}

export interface ClanInterface {
  tag: string;
  type: string;
  name: string;
  clanLevel: number;
  clanPoints: number;
  warWins: number;
  members: number;
  warLosses: number;
  requiredTrophies: number;
  badgeUrls: {
    small?: string;
    large?: string;
    medium?: string;
  };
  labels: Array<{
    id: number;
    name: string;
    iconUrls: {
      small: string;
    };
  }>;
}
