"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

// Define types for our stats
interface PlayerStats {
  playerinfo: {
    username: string;
    uuid: string;
    firstLogin: string;
    lastLogin: string;
    rank: {
      id: string;
      color: string;
    };
  };
  stats: {
    playtime: {
      total: number;
      pretty: string;
    };
    balance: {
      pixels: number;
      shards: number;
    };
    bedwars: {
      wins: number;
      losses: number;
      kills: number;
      deaths: number;
      bedsDestroyed: number;
      kdr: number;
      winRate: number;
      gamesPlayed: number;
    };
    parkour: {
      completions: number;
      bestTime: string;
      checkpoint: number;
    };
  };
}

interface RankResponse {
  uuid: string;
  rank: string;
}

export default function PlayerStatistics() {
  const [username, setUsername] = useState<string>("");
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = window.location.pathname.split("/").pop();
    if (storedUsername && storedUsername !== "stats") {
      setUsername(storedUsername);
      fetchPlayerStats(storedUsername);
    }
  }, []);

  // Parse Minecraft rank color codes to Hex values
  const parseColorCode = (colorCode: string): string => {
    const colorMap: Record<string, string> = {
      '0': '#000000', // Black
      '1': '#0000AA', // Dark Blue
      '2': '#00AA00', // Dark Green
      '3': '#00AAAA', // Dark Aqua
      '4': '#AA0000', // Dark Red
      '5': '#AA00AA', // Dark Purple
      '6': '#FFAA00', // Gold
      '7': '#AAAAAA', // Gray
      '8': '#555555', // Dark Gray
      '9': '#5555FF', // Blue
      'a': '#55FF55', // Green
      'b': '#55FFFF', // Aqua
      'c': '#FF5555', // Red
      'd': '#FF55FF', // Light Purple
      'e': '#FFFF55', // Yellow
      'f': '#FFFFFF', // White
    };

    // If starts with & or § followed by a color code
    if (colorCode && (colorCode.startsWith('&') || colorCode.startsWith('§')) && colorCode.length > 1) {
      const code = colorCode.charAt(1).toLowerCase();
      return colorMap[code] || '#FFFFFF';
    }
    
    return '#FFFFFF'; // Default white
  };

  // Extract rank name from color-coded string
  const extractRankName = (rankString: string): string => {
    // Remove color codes (& or § followed by a character)
    return rankString.replace(/[&§][0-9a-fA-F]/g, '').trim();
  };

  const fetchPlayerStats = async (name: string) => {
    if (!name) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, you would fetch from your API
      // const response = await fetch(`https://api.onthepixel.net/stats/${name}`);
      // const data = await response.json();
      
      // For now, let's create dummy data
      let dummyData: PlayerStats = {
        playerinfo: {
          username: name,
          uuid: "00000000-0000-0000-0000-000000000000", // Will be updated with actual UUID
          firstLogin: "2023-08-15",
          lastLogin: "2025-03-05",
          rank: {
            id: "Member", // Will be updated with rank from API
            color: "#AAAAAA"  // Will be updated with color from API
          }
        },
        stats: {
          playtime: {
            total: 12445,
            pretty: "207h 25m"
          },
          balance: {
            pixels: 15000,
            shards: 320
          },
          bedwars: {
            wins: 47,
            losses: 53,
            kills: 182,
            deaths: 165,
            bedsDestroyed: 35,
            kdr: 1.1,
            winRate: 47,
            gamesPlayed: 100
          },
          parkour: {
            completions: 8,
            bestTime: "1m 45s",
            checkpoint: 12
          }
        }
      };
      
      try {
        // Instead of random ranks, we'll fetch the actual rank from the API
        // First we need to fetch the UUID of the player
        // This is a simulation since we don't have the actual Mojang API call here
        const uuid = `${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
        
        dummyData.playerinfo.uuid = uuid;
        
        // In production, you would use the actual API:
        // const rankResponse = await fetch(`https://api.onthepixel.net/stats/luckperms/rank/${uuid}`);
        // const rankData = await rankResponse.json();
        
        // For now, simulate the rank response
        const rankData: RankResponse = {
          uuid: uuid,
          rank: name.length > 5 ? "&6VIP+" : "&6MEMBER" // Similar to your example
        };
        
        // Update the player info with the rank data
        dummyData.playerinfo.rank = {
          id: extractRankName(rankData.rank),
          color: parseColorCode(rankData.rank)
        };
      } catch (rankError) {
        console.error("Error fetching rank data:", rankError);
        // If rank fetch fails, keep the default rank
      }
      
      if (name.toLowerCase() === 'error') {
        throw new Error("Player not found");
      }
      
      setStats(dummyData);
      
      // Update URL
      const newUrl = `/stats/${name}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
      
    } catch (error) {
      console.error("Error fetching player data:", error);
      setError("Player not found or an error occurred.");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchPlayerStats(username);
  };

  // Format dates to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-5">
        {stats ? `STATISTICS FOR ${stats.playerinfo.username}` : 'PLAYER STATISTICS'}
      </h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter A Minecraft Username"
              className="w-full pl-10 bg-gray-800/50 border-gray-700"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button 
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={loading || !username}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>
      
      {error && (
        <Card className="mb-6 border-red-500/30 bg-red-950/10">
          <CardContent className="pt-6">
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}
      
      {stats && (
        <>
          <Card className="bg-gray-900/50 border-gray-800 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="relative h-40 w-40 overflow-hidden rounded-lg border-green-600 bg-gray-600 shadow-lg">
                  <Image
                    src={`https://vzge.me/full/400/${stats.playerinfo.username}.png`}
                    className="absolute left-0 right-0 m-auto translate-y-10 scale-110 bg-gray-600"
                    alt={stats.playerinfo.username}
                    width={400}
                    height={400}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{stats.playerinfo.username}</h2>
                    <Badge 
                      style={{backgroundColor: stats.playerinfo.rank.color}}
                      className="text-black"
                    >
                      {stats.playerinfo.rank.id}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">First joined</p>
                      <p className="font-medium">{formatDate(stats.playerinfo.firstLogin)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Last online</p>
                      <p className="font-medium">{formatDate(stats.playerinfo.lastLogin)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Playtime</p>
                      <p className="font-medium">{stats.stats.playtime.pretty}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Balance</p>
                      <p className="font-medium">
                        <span className="text-green-400">{stats.stats.balance.pixels.toLocaleString()}</span> pixels
                        {" • "}
                        <span className="text-purple-400">{stats.stats.balance.shards.toLocaleString()}</span> shards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
