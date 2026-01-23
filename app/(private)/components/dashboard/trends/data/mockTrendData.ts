/**
 * Mock Trend Data
 *
 * Generates realistic mock data for trending hashtags, sounds, and effects.
 * This data simulates what the TikTok Research API would return.
 *
 * Data is designed to match Research API fields:
 * - hashtag_names, hashtag_info_list
 * - music_id
 * - effect_ids, effect_info_list
 * - region_code
 */

// =============================================================================
// Types
// =============================================================================

export interface TrendingHashtag {
  rank: number;
  name: string;
  usageCount: number;
  change24h: number;
  change7d: number;
  sparklineData: number[];
  category: string;
  topVideosCount: number;
}

export interface TrendingSound {
  rank: number;
  musicId: string;
  title: string;
  artist: string;
  usageCount: number;
  change24h: number;
  change7d: number;
  sparklineData: number[];
  genre: string;
  duration: number; // seconds
}

export interface TrendingEffect {
  rank: number;
  effectId: string;
  name: string;
  usageCount: number;
  change24h: number;
  change7d: number;
  sparklineData: number[];
  category: string;
}

export interface TrendStats {
  totalHashtags: number;
  totalSounds: number;
  totalEffects: number;
  topGainer: { name: string; change: number; type: "hashtag" | "sound" | "effect" };
  topLoser: { name: string; change: number; type: "hashtag" | "sound" | "effect" };
  lastUpdated: string;
}

export interface Region {
  code: string;
  name: string;
  flag: string;
}

// =============================================================================
// Constants
// =============================================================================

export const REGIONS: Region[] = [
  { code: "GLOBAL", name: "Global", flag: "🌍" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
];

const HASHTAG_CATEGORIES = [
  "Entertainment",
  "Music",
  "Dance",
  "Comedy",
  "Education",
  "Food",
  "Fashion",
  "Fitness",
  "Gaming",
  "Beauty",
  "Travel",
  "DIY",
  "Pets",
  "Sports",
  "Technology",
];

const SOUND_GENRES = [
  "Pop",
  "Hip Hop",
  "Electronic",
  "R&B",
  "Rock",
  "Latin",
  "K-Pop",
  "Indie",
  "Country",
  "Classical",
  "Original Sound",
  "Viral Audio",
];

const EFFECT_CATEGORIES = [
  "Face Filters",
  "AR Effects",
  "Color Grading",
  "Transitions",
  "Green Screen",
  "Beauty",
  "Funny",
  "Interactive",
  "Trending",
  "Seasonal",
];

// =============================================================================
// Mock Data - Hashtags
// =============================================================================

const MOCK_HASHTAGS: Omit<TrendingHashtag, "rank" | "sparklineData">[] = [
  { name: "fyp", usageCount: 892400000, change24h: 2.3, change7d: 5.1, category: "Entertainment", topVideosCount: 15420000 },
  { name: "viral", usageCount: 456700000, change24h: 4.7, change7d: 12.3, category: "Entertainment", topVideosCount: 8920000 },
  { name: "trending", usageCount: 312500000, change24h: -1.2, change7d: 3.8, category: "Entertainment", topVideosCount: 6540000 },
  { name: "dance", usageCount: 287600000, change24h: 3.1, change7d: 8.9, category: "Dance", topVideosCount: 5870000 },
  { name: "comedy", usageCount: 234100000, change24h: 1.8, change7d: -2.1, category: "Comedy", topVideosCount: 4230000 },
  { name: "music", usageCount: 198700000, change24h: 5.2, change7d: 15.7, category: "Music", topVideosCount: 3890000 },
  { name: "funny", usageCount: 176300000, change24h: -0.8, change7d: 1.2, category: "Comedy", topVideosCount: 3120000 },
  { name: "duet", usageCount: 145600000, change24h: 8.4, change7d: 23.6, category: "Entertainment", topVideosCount: 2780000 },
  { name: "trend", usageCount: 134200000, change24h: 6.1, change7d: 18.9, category: "Entertainment", topVideosCount: 2450000 },
  { name: "tiktok", usageCount: 123800000, change24h: 0.5, change7d: 2.3, category: "Entertainment", topVideosCount: 2210000 },
  { name: "love", usageCount: 112400000, change24h: 2.9, change7d: 7.4, category: "Entertainment", topVideosCount: 1980000 },
  { name: "food", usageCount: 98700000, change24h: 4.3, change7d: 11.2, category: "Food", topVideosCount: 1760000 },
  { name: "fashion", usageCount: 87600000, change24h: 7.8, change7d: 21.4, category: "Fashion", topVideosCount: 1540000 },
  { name: "fitness", usageCount: 76500000, change24h: 3.6, change7d: 9.8, category: "Fitness", topVideosCount: 1320000 },
  { name: "gaming", usageCount: 67400000, change24h: 12.3, change7d: 34.7, category: "Gaming", topVideosCount: 1180000 },
  { name: "beauty", usageCount: 58900000, change24h: 5.4, change7d: 14.2, category: "Beauty", topVideosCount: 1040000 },
  { name: "travel", usageCount: 51200000, change24h: 9.1, change7d: 27.3, category: "Travel", topVideosCount: 920000 },
  { name: "diy", usageCount: 45600000, change24h: -2.4, change7d: -5.8, category: "DIY", topVideosCount: 810000 },
  { name: "pets", usageCount: 41300000, change24h: 6.7, change7d: 19.5, category: "Pets", topVideosCount: 730000 },
  { name: "sports", usageCount: 38700000, change24h: 11.2, change7d: 28.9, category: "Sports", topVideosCount: 680000 },
  { name: "tutorial", usageCount: 34500000, change24h: 4.1, change7d: 12.6, category: "Education", topVideosCount: 610000 },
  { name: "art", usageCount: 31200000, change24h: 8.9, change7d: 24.1, category: "DIY", topVideosCount: 550000 },
  { name: "challenge", usageCount: 28900000, change24h: 15.6, change7d: 42.3, category: "Entertainment", topVideosCount: 510000 },
  { name: "recipe", usageCount: 26700000, change24h: 3.2, change7d: 8.7, category: "Food", topVideosCount: 470000 },
  { name: "motivation", usageCount: 24500000, change24h: 2.1, change7d: 6.4, category: "Education", topVideosCount: 430000 },
];

// =============================================================================
// Mock Data - Sounds
// =============================================================================

const MOCK_SOUNDS: Omit<TrendingSound, "rank" | "sparklineData">[] = [
  { musicId: "snd_001", title: "Original Sound", artist: "viral_creator", usageCount: 234500000, change24h: 18.4, change7d: 67.2, genre: "Original Sound", duration: 15 },
  { musicId: "snd_002", title: "Espresso", artist: "Sabrina Carpenter", usageCount: 187600000, change24h: 5.2, change7d: 23.4, genre: "Pop", duration: 30 },
  { musicId: "snd_003", title: "Not Like Us", artist: "Kendrick Lamar", usageCount: 156800000, change24h: -2.1, change7d: 8.9, genre: "Hip Hop", duration: 28 },
  { musicId: "snd_004", title: "Birds of a Feather", artist: "Billie Eilish", usageCount: 134200000, change24h: 8.7, change7d: 31.5, genre: "Pop", duration: 25 },
  { musicId: "snd_005", title: "APT.", artist: "ROSÉ & Bruno Mars", usageCount: 112500000, change24h: 42.3, change7d: 156.8, genre: "K-Pop", duration: 22 },
  { musicId: "snd_006", title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", usageCount: 98700000, change24h: 6.4, change7d: 19.2, genre: "Pop", duration: 32 },
  { musicId: "snd_007", title: "Taste", artist: "Sabrina Carpenter", usageCount: 87400000, change24h: 3.1, change7d: 14.7, genre: "Pop", duration: 27 },
  { musicId: "snd_008", title: "Remix Sound Effect", artist: "tiktok_sounds", usageCount: 76500000, change24h: 12.8, change7d: 45.6, genre: "Viral Audio", duration: 8 },
  { musicId: "snd_009", title: "Good Luck, Babe!", artist: "Chappell Roan", usageCount: 67800000, change24h: 4.9, change7d: 17.3, genre: "Pop", duration: 29 },
  { musicId: "snd_010", title: "MILLION DOLLAR BABY", artist: "Tommy Richman", usageCount: 58900000, change24h: -5.2, change7d: -12.4, genre: "R&B", duration: 24 },
  { musicId: "snd_011", title: "Saturn", artist: "SZA", usageCount: 51200000, change24h: 7.6, change7d: 25.8, genre: "R&B", duration: 31 },
  { musicId: "snd_012", title: "Funny Sound Effect", artist: "sound_effects", usageCount: 45600000, change24h: 9.3, change7d: 32.1, genre: "Viral Audio", duration: 5 },
  { musicId: "snd_013", title: "Paint The Town Red", artist: "Doja Cat", usageCount: 41300000, change24h: -3.4, change7d: -8.9, genre: "Hip Hop", duration: 26 },
  { musicId: "snd_014", title: "Carnival", artist: "Kanye West", usageCount: 38700000, change24h: 2.8, change7d: 11.5, genre: "Hip Hop", duration: 33 },
  { musicId: "snd_015", title: "Dramatic Effect", artist: "audio_clips", usageCount: 34500000, change24h: 15.2, change7d: 52.4, genre: "Viral Audio", duration: 12 },
  { musicId: "snd_016", title: "Lofi Beat", artist: "chillhop_music", usageCount: 31200000, change24h: 4.5, change7d: 16.7, genre: "Electronic", duration: 45 },
  { musicId: "snd_017", title: "TEXAS HOLD 'EM", artist: "Beyoncé", usageCount: 28900000, change24h: 1.2, change7d: 5.8, genre: "Country", duration: 28 },
  { musicId: "snd_018", title: "we can't be friends", artist: "Ariana Grande", usageCount: 26700000, change24h: 6.1, change7d: 21.4, genre: "Pop", duration: 30 },
  { musicId: "snd_019", title: "Woozy Sound", artist: "viral_audio", usageCount: 24500000, change24h: 23.7, change7d: 89.3, genre: "Viral Audio", duration: 7 },
  { musicId: "snd_020", title: "Supernova", artist: "aespa", usageCount: 22800000, change24h: 8.9, change7d: 34.6, genre: "K-Pop", duration: 25 },
];

// =============================================================================
// Mock Data - Effects
// =============================================================================

const MOCK_EFFECTS: Omit<TrendingEffect, "rank" | "sparklineData">[] = [
  { effectId: "eff_001", name: "Green Screen", usageCount: 345600000, change24h: 2.1, change7d: 8.4, category: "Green Screen" },
  { effectId: "eff_002", name: "Beauty Mode", usageCount: 287400000, change24h: 1.5, change7d: 5.2, category: "Beauty" },
  { effectId: "eff_003", name: "Slow Motion", usageCount: 234500000, change24h: 3.8, change7d: 12.6, category: "Transitions" },
  { effectId: "eff_004", name: "AI Yearbook", usageCount: 198700000, change24h: 45.2, change7d: 234.7, category: "AR Effects" },
  { effectId: "eff_005", name: "Face Zoom", usageCount: 176300000, change24h: 8.9, change7d: 27.3, category: "Face Filters" },
  { effectId: "eff_006", name: "Blur Background", usageCount: 156800000, change24h: 4.2, change7d: 14.8, category: "Green Screen" },
  { effectId: "eff_007", name: "Vintage Filter", usageCount: 134200000, change24h: 6.7, change7d: 21.5, category: "Color Grading" },
  { effectId: "eff_008", name: "Split Screen", usageCount: 112500000, change24h: 5.1, change7d: 18.2, category: "Transitions" },
  { effectId: "eff_009", name: "Cat Ears", usageCount: 98700000, change24h: -2.3, change7d: -6.8, category: "Face Filters" },
  { effectId: "eff_010", name: "Neon Glow", usageCount: 87400000, change24h: 11.4, change7d: 38.9, category: "Color Grading" },
  { effectId: "eff_011", name: "Anime Filter", usageCount: 76500000, change24h: 23.6, change7d: 87.4, category: "AR Effects" },
  { effectId: "eff_012", name: "Time Warp", usageCount: 67800000, change24h: 7.8, change7d: 24.6, category: "Transitions" },
  { effectId: "eff_013", name: "Sparkle Eyes", usageCount: 58900000, change24h: 4.5, change7d: 15.3, category: "Face Filters" },
  { effectId: "eff_014", name: "3D Photo", usageCount: 51200000, change24h: 9.2, change7d: 31.7, category: "AR Effects" },
  { effectId: "eff_015", name: "Voice Changer", usageCount: 45600000, change24h: 6.3, change7d: 22.1, category: "Funny" },
  { effectId: "eff_016", name: "Bling Effect", usageCount: 41300000, change24h: -4.1, change7d: -11.5, category: "Face Filters" },
  { effectId: "eff_017", name: "Snow Falling", usageCount: 38700000, change24h: 34.8, change7d: 145.2, category: "Seasonal" },
  { effectId: "eff_018", name: "Game Face", usageCount: 34500000, change24h: 8.1, change7d: 28.4, category: "Interactive" },
  { effectId: "eff_019", name: "Film Grain", usageCount: 31200000, change24h: 5.7, change7d: 19.6, category: "Color Grading" },
  { effectId: "eff_020", name: "Clone Effect", usageCount: 28900000, change24h: 12.9, change7d: 45.8, category: "AR Effects" },
];

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Generate sparkline data with realistic trend patterns
 */
function generateSparkline(change7d: number, volatility: number = 0.3): number[] {
  const points = 7;
  const data: number[] = [];
  let current = 100;
  const trend = change7d / 7; // Daily average change

  for (let i = 0; i < points; i++) {
    // Add some randomness while following the overall trend
    const noise = (Math.random() - 0.5) * volatility * current;
    current = current * (1 + trend / 100) + noise;
    data.push(Math.max(0, current));
  }

  return data;
}

/**
 * Format large numbers (e.g., 1234567 -> "1.23M")
 */
export function formatUsageCount(count: number): string {
  if (count >= 1_000_000_000) {
    return (count / 1_000_000_000).toFixed(2) + "B";
  }
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(2) + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(2) + "K";
  }
  return count.toString();
}

/**
 * Format percentage change with sign
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

// =============================================================================
// Data Generators
// =============================================================================

/**
 * Get mock trending hashtags with rankings and sparklines
 */
export function getMockHashtags(region: string = "GLOBAL"): TrendingHashtag[] {
  // In real implementation, data would vary by region
  // For now, we'll add slight variations based on region
  const regionMultiplier = region === "GLOBAL" ? 1 : 0.7 + Math.random() * 0.5;

  return MOCK_HASHTAGS.map((hashtag, index) => ({
    ...hashtag,
    rank: index + 1,
    usageCount: Math.floor(hashtag.usageCount * regionMultiplier),
    sparklineData: generateSparkline(hashtag.change7d),
  }));
}

/**
 * Get mock trending sounds with rankings and sparklines
 */
export function getMockSounds(region: string = "GLOBAL"): TrendingSound[] {
  const regionMultiplier = region === "GLOBAL" ? 1 : 0.6 + Math.random() * 0.6;

  return MOCK_SOUNDS.map((sound, index) => ({
    ...sound,
    rank: index + 1,
    usageCount: Math.floor(sound.usageCount * regionMultiplier),
    sparklineData: generateSparkline(sound.change7d, 0.4),
  }));
}

/**
 * Get mock trending effects with rankings and sparklines
 */
export function getMockEffects(region: string = "GLOBAL"): TrendingEffect[] {
  const regionMultiplier = region === "GLOBAL" ? 1 : 0.65 + Math.random() * 0.55;

  return MOCK_EFFECTS.map((effect, index) => ({
    ...effect,
    rank: index + 1,
    usageCount: Math.floor(effect.usageCount * regionMultiplier),
    sparklineData: generateSparkline(effect.change7d, 0.35),
  }));
}

/**
 * Get overall trend statistics
 */
export function getMockTrendStats(region: string = "GLOBAL"): TrendStats {
  const hashtags = getMockHashtags(region);
  const sounds = getMockSounds(region);
  const effects = getMockEffects(region);

  // Find top gainer across all categories
  const allItems = [
    ...hashtags.map((h) => ({ name: `#${h.name}`, change: h.change24h, type: "hashtag" as const })),
    ...sounds.map((s) => ({ name: s.title, change: s.change24h, type: "sound" as const })),
    ...effects.map((e) => ({ name: e.name, change: e.change24h, type: "effect" as const })),
  ];

  const sorted = [...allItems].sort((a, b) => b.change - a.change);
  const topGainer = sorted[0];
  const topLoser = sorted[sorted.length - 1];

  return {
    totalHashtags: hashtags.length * 1000 + Math.floor(Math.random() * 500),
    totalSounds: sounds.length * 800 + Math.floor(Math.random() * 400),
    totalEffects: effects.length * 200 + Math.floor(Math.random() * 100),
    topGainer,
    topLoser,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get volume data for charts (30 days)
 */
export function getMockVolumeData(days: number = 30): { labels: string[]; data: number[] } {
  const labels: string[] = [];
  const data: number[] = [];
  const baseVolume = 500_000_000;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));

    // Generate realistic volume with weekly patterns
    const dayOfWeek = date.getDay();
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.15 : 1;
    const noise = 0.9 + Math.random() * 0.2;
    const trend = 1 + (days - i) * 0.005; // Slight upward trend

    data.push(Math.floor(baseVolume * weekendMultiplier * noise * trend));
  }

  return { labels, data };
}

/**
 * Get category distribution data
 */
export function getMockCategoryDistribution(
  type: "hashtag" | "sound" | "effect"
): { labels: string[]; data: number[] } {
  if (type === "hashtag") {
    return {
      labels: HASHTAG_CATEGORIES.slice(0, 8),
      data: [25, 18, 15, 12, 10, 8, 7, 5],
    };
  }
  if (type === "sound") {
    return {
      labels: SOUND_GENRES.slice(0, 8),
      data: [28, 22, 15, 12, 8, 6, 5, 4],
    };
  }
  return {
    labels: EFFECT_CATEGORIES.slice(0, 8),
    data: [24, 20, 16, 14, 10, 8, 5, 3],
  };
}
