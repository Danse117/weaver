# Weaver-App





# API Fields & Available Metrics:

## TikTok
### Key Engagement Metrics Summary

**What TikTok APIs Provide for Analytics:**

#### Profile-Level Metrics (Display API - `user.info.stats`)
✅ **Available:**
- `follower_count` - Total followers
- `following_count` - Total following
- `likes_count` - Total likes received across all content
- `video_count` - Total videos posted

❌ **NOT Available via API:**
- Profile views
- Profile visit rate
- Audience demographics (age, gender, location breakdown)
- Traffic sources (For You Page vs Following vs Profile vs Search)
- Follower growth over time (requires historical tracking)
- Engagement rate calculations (must calculate: total engagement / reach)

#### Video-Level Engagement Metrics (Display API - `video.list`)
✅ **Available:**
- `view_count` - Total views
- `like_count` - Total likes
- `comment_count` - Total comments  
- `share_count` - Total shares

**Research API adds:**
- `favorites_count` - Saves/bookmarks

❌ **NOT Available via API:**
- Watch time / Average view duration
- Completion rate / Average watch percentage
- Rewatches
- Traffic source breakdown per video
- Unique vs total views
- Impressions (how many times shown in feed)
- Click-through rate from impressions to views

#### Calculated Metrics (You Must Build)
These require multiple API calls or historical data:
- **Engagement Rate** = (likes + comments + shares) / views × 100
- **Follower Growth Rate** = (new followers / starting followers) × 100 over period
- **Average Engagement per Post** = total engagement / video count
- **Video Posting Frequency** = video count / time period
- **Best Performing Content** = sort by engagement rate or views
- **Content Type Performance** = aggregate by hashtags/effects used
- **Trend Analysis** = compare current vs previous period performance

#### Comment-Level Metrics (Research API Only)
✅ **Available:**
- Comment text and sentiment analysis potential
- `like_count` per comment - comment engagement
- `reply_count` - conversation depth
- Comment timestamp - when engagement happens
- Reply threads - `parent_comment_id` for thread analysis

#### Content Metadata for Analysis (Research API)
✅ **Available:**
- `hashtag_names` + `hashtag_info_list` - trending topics, content themes
- `music_id` - trending sounds analysis
- `effect_ids` + `effect_info_list` - viral effects usage
- `voice_to_text` - content transcription for keyword analysis
- `video_duration` - optimal length analysis
- `region_code` - geographic performance
- `is_stem_verified` - educational content verification

### Important Limitations

**TikTok's Official APIs Do NOT Provide:**
1. **Algorithmic insights**: Why content performed well/poorly, FYP algorithm signals
2. **Real-time analytics**: Most APIs have rate limits (600 req/min for Display API)
3. **Historical data limits**: Must implement own data storage for time-series analysis
4. **Watch time metrics**: Average view duration, completion rate, rewatch rate
5. **Audience demographics**: Age, gender, location, interests of your audience
6. **Traffic source attribution**: Cannot see if views came from FYP, profile, search, etc.
7. **Impression data**: Cannot see how many times video appeared in feeds before being clicked
8. **Direct comparison to competitors**: No benchmark data against similar accounts

**What This Means for Weaver:**
- Focus on **metrics we CAN get**: engagement rates, growth trends, content performance comparisons
- Build **longitudinal tracking**: Store historical data to show trends over time
- Provide **context through aggregation**: Show relative performance (this video vs your average)
- Use **Research API** if eligible for deeper content analysis (hashtags, effects, comments)
- Be transparent with users about what TikTok exposes vs. doesn't

### Quick Reference: All Available Engagement & Performance Metrics

| Metric Category | Metric Name | Display API | Organic API | Research API | Notes |
|----------------|-------------|-------------|-------------|--------------|-------|
| **Profile Growth** | Follower count | ✅ | ✅ | ✅ | All APIs |
| | Following count | ✅ | ❌ | ✅ | Not in Organic |
| | Profile views | ❌ | ✅ | ❌ | **Organic only** |
| | New followers daily | ❌ | ✅ | ❌ | **Organic only** |
| | Total likes received | ✅ | ✅ | ✅ | All APIs |
| | Video count | ✅ | ❌ | ✅ | Display + Research |
| **Video Engagement** | View count | ✅ | ✅ | ✅ | All APIs |
| | Like count | ✅ | ✅ | ✅ | All APIs |
| | Comment count | ✅ | ✅ | ✅ | All APIs |
| | Share count | ✅ | ✅ | ✅ | All APIs |
| | Favorites/Saves count | ❌ | ✅ | ✅ | **Not in Display** |
| **Watch Time** ⭐ | Average time watched | ❌ | ✅ | ❌ | **🎯 Organic only!** |
| | Total time watched | ❌ | ✅ | ❌ | **🎯 Organic only!** |
| | Full video watched rate | ❌ | ✅ | ❌ | **🎯 Organic only!** |
| | Video completion % | ❌ | 📊 | ❌ | **Calculate from Organic** |
| **Reach & Impressions** | Unique viewers (reach) | ❌ | ✅ | ❌ | **Organic only** |
| | Daily impressions | ❌ | ✅ | ❌ | **Organic only** |
| | Accounts engaged/day | ❌ | ✅ | ❌ | **Organic only** |
| **Demographics** | Followers by country | ❌ | ✅ | ❌ | **Organic only** |
| | Followers by gender | ❌ | ✅ | ❌ | **Organic only** |
| **Comment Analysis** | Comment text | ❌ | ✅ | ✅ | Organic + Research |
| | Comment likes | ❌ | ❌ | ✅ | **Research only** |
| | Comment replies | ❌ | ❌ | ✅ | **Research only** |
| | Comment timestamps | ❌ | ✅ | ✅ | Organic + Research |
| **Content Metadata** | Hashtags used | ❌ | ❌ | ✅ | **Research only** |
| | Music/Sound ID | ❌ | ❌ | ✅ | **Research only** |
| | Effects used | ❌ | ❌ | ✅ | **Research only** |
| | Video transcript | ❌ | ❌ | ✅ | **Research only** |
| | Video duration | ✅ | ✅ | ✅ | All APIs |
| | Region/Location | ❌ | ❌ | ✅ | **Research only** |
| **Calculated** | Engagement rate | 📊 | 📊 | 📊 | All APIs |
| | Follower growth rate | 📊 | 📊 | 📊 | Track over time |
| | Avg engagement per post | 📊 | 📊 | 📊 | All APIs |
| | Content performance trends | 📊 | 📊 | 📊 | Historical analysis |
| | Watch completion % | ❌ | 📊 | ❌ | **Organic only** |
| | Profile visit rate | ❌ | 📊 | ❌ | **Organic only** |

**Legend:**
- ✅ = Directly available from API
- ❌ = Not available
- 📊 = Must calculate/derive from available data
- ⭐ = Critical metrics for engagement analysis
- 🎯 = High-value exclusive feature

---

### 🎯 CRITICAL INSIGHT: Organic API for Watch Time Metrics

**The Organic API (for TikTok Business accounts) provides watch time metrics that Display API does NOT:**

✅ **Average time watched** - How long viewers watch on average  
✅ **Total time watched** - Cumulative watch time across all views  
✅ **Full video watched rate** - Percentage who watched entire video  
✅ **Reach & impressions** - Unique viewers and impression counts  
✅ **Audience demographics** - Followers by country and gender  
✅ **Profile views** - Track profile page visits  

**How to access:**
1. User must convert their TikTok account to a Business account (free, takes 1 minute)
2. Use TikTok's Organic API endpoints (part of Business API suite)
3. No institutional approval required (unlike Research API)

**Weaver Strategy:**
- Detect if user has Business account during OAuth flow
- If yes: Use Organic API for enhanced metrics
- If no: Prompt user to upgrade with clear benefits explanation
- If user declines: Fall back to Display API

This is a **major differentiator** - watch time and completion rate are the #1 ranking factors for TikTok's algorithm in 2025.

---

### Business/Marketing API (For Advertisers Only)

**Note:** TikTok's Business API is separate from the Display API. It includes both paid advertising analytics (Marketing API) and enhanced organic analytics (Organic API for Business accounts).

#### Marketing API - Paid Ads Analytics

**Available Metrics:** 373 metrics and 152 dimensions for comprehensive ad reporting

**Basic Performance Metrics:**
- `impressions` - Total ad impressions
- `gross_impressions` - Impressions including duplicates
- `clicks` - Clicks to destination
- `spend` / `total_cost` - Total ad spend
- `conversions` - Total conversions
- `conversion_rate` - Conversion percentage
- `results` - Goal completions
- `result_rate` - Result percentage

**Cost Efficiency Metrics:**
- `cpc` - Cost per click
- `cpm` - Cost per 1000 impressions
- `cpa` - Cost per acquisition
- `cost_per_conversion` - Cost per conversion event
- `cost_per_result` - Cost per goal completion
- `cost_per_1000_reached` - Cost per 1000 unique users

**Engagement Metrics:**
- `ctr` - Click-through rate
- `reach` - Unique users reached
- `frequency` - Average impressions per user
- `engagement_rate` - Engagement percentage
- `engagements` - Total engagements

**Video Performance Metrics:**
- `video_play_actions` - Video plays initiated
- `video_watched_2s` / `6s` - Videos watched 2s/6s
- `video_watched_25%` / `50%` / `75%` / `100%` - Completion milestones
- `average_video_play` - Average watch time per video
- `average_video_play_per_user` - Average watch time per user
- `video_likes` - Likes on video ads
- `video_comments` - Comments on video ads
- `video_shares` - Shares of video ads

**Conversion Attribution Metrics:**

*Click-Through Attribution (CTA):*
- `cta_conversions` - Conversions after click
- `cta_purchase` - Purchases after click
- `cta_registration` - Registrations after click
- `cost_per_cta_conversion` - Cost per click-attributed conversion
- `cost_per_cta_purchase` - Cost per click-attributed purchase
- `cost_per_cta_registration` - Cost per click-attributed registration

*View-Through Attribution (VTA):*
- `vta_conversions` - Conversions after view
- `vta_purchase` - Purchases after view
- `vta_registration` - Registrations after view
- `cost_per_vta_conversion` - Cost per view-attributed conversion
- `cost_per_vta_purchase` - Cost per view-attributed purchase
- `cost_per_vta_registration` - Cost per view-attributed registration

**Interactive Features:**
- `music_disc_clicks` - Clicks on music disc
- `duet_clicks` - Duet button clicks
- `stitch_clicks` - Stitch button clicks
- `interactive_add_on_impressions` - Interactive element impressions
- `interactive_add_on_clicks` - Interactive element clicks
- `live_views` - Live stream views
- `live_product_clicks` - Product clicks during live

**Advanced Tracking:**
- `real_time_conversions` - Immediate conversion tracking
- `real_time_conversion_rate` - Real-time conversion percentage
- `skan_results` - iOS app install attribution (StoreKit Ad Network)
- `in_app_installs` - App installs tracked
- `in_app_conversions` - In-app conversion events

**Account/Campaign Dimensions:**
- `advertiser_id` / `advertiser_name` - Account identifiers
- `advertiser_balance` - Available ad budget
- `advertiser_currency` - Account currency
- `advertiser_timezone` - Reporting timezone
- `advertiser_country` - Business location
- `campaign_id` / `campaign_name` - Campaign identifiers
- `ad_group_id` / `ad_group_name` - Ad group identifiers
- `ad_id` / `ad_name` - Individual ad identifiers

**Calculated Metrics (Marketing API):**
- **ROAS** (Return on Ad Spend) = Revenue / Spend
- **CPA by Channel** = Spend / Conversions per traffic source
- **Engagement to Conversion Rate** = Conversions / Engagements
- **View-to-Click Rate** = Clicks / Impressions
- **Video Completion Rate** = Videos watched 100% / Video plays
- **Cost Per Engagement** = Spend / Total engagements
- **Incremental Attribution** = CTA conversions + VTA conversions
- **Custom Metrics** = User-defined formulas combining above metrics

#### Organic API - Business Account Analytics

**⚠️ CRITICAL DISCOVERY:** The Organic API (for TikTok Business accounts) provides watch time metrics that the Display API does NOT expose!

**Requires:** TikTok Business account (free to convert)

**Profile-Level Metrics (Daily, 60-day lookback):**
- `followers` - Current follower count
- `new_followers` - New followers for the day
- `profile_views` - Profile page views
- `video_views` - Total video views
- `comments` - Total comments across all videos
- `likes` - Total likes across all videos
- `shares` - Total shares across all videos
- `total_engagement` - Comments + likes + shares

**Video-Level Metrics (Lifetime):**

*Standard Engagement (also in Display API):*
- `video_views` - Total views
- `likes` - Like count
- `comments` - Comment count
- `shares` - Share count
- `saves` - Favorites/bookmarks

*Watch Time Metrics (ONLY in Organic API):* ⭐
- `average_time_watched` - Average watch duration in seconds
- `total_time_watched` - Total watch time in seconds
- `full_video_watched_rate` - % who watched entire video (0.0-1.0)
- `video_duration` - Video length in seconds

*Reach & Impressions:*
- `reach` - Unique viewers
- `impressions_per_day` - Daily impressions
- `accounts_engaged_per_day` - Unique daily engagers
- `total_interactions_per_day` - Daily interaction count

**Audience Demographics (Organic API Only):**
- `followers_by_country` - Geographic distribution with percentages
- `followers_by_gender` - Gender distribution

**Video Dimensions:**
- `video_id` - Unique identifier
- `video_caption` - Video description
- `video_create_time` - Post timestamp
- `video_share_url` - Public URL
- `video_thumbnail_url` - Thumbnail image
- `video_embed_url` - Embed URL

**Comment Data:**
- `comment_id` - Comment identifier
- `comment_date` - Comment timestamp
- `comment_username` - Commenter username
- `comment_text` - Comment content

**Calculated Metrics (Organic API):**
- **Engagement Rate** = (likes + comments + shares + saves) / views × 100
- **Watch Completion Rate** = `full_video_watched_rate` × 100
- **Average Watch %** = (`average_time_watched` / `video_duration`) × 100
- **Retention Score** = `average_time_watched` / `video_duration` for comparison
- **Total Watch Hours** = `total_time_watched` / 3600
- **Profile Visit Rate** = `profile_views` / `video_views` × 100
- **Follower Conversion Rate** = `new_followers` / `profile_views` × 100
- **Engagement to Profile Rate** = `profile_views` / `total_engagement`
- **Daily Engagement per Follower** = `total_engagement` / `followers`
- **Video Virality Coefficient** = `shares` / `views` × 100

**Recommendation for Weaver:**

1. **For most users (MVP):** Start with Display API - accessible to all TikTok users
2. **For Business accounts:** Detect if user has TikTok Business account and use Organic API instead - provides watch time metrics!
3. **For institutional researchers:** Add Research API capabilities later for advanced users with approved access
4. **For advertisers (future):** Marketing API for paid ad analytics

**Priority Implementation Order:**
- ✅ Phase 1: Display API (all users)
- 🎯 Phase 2: Organic API (Business accounts) - **HIGH VALUE** due to watch time metrics
- 📊 Phase 3: Research API (approved researchers)
- 💰 Phase 4: Marketing API (advertisers)

### Recommended Metrics to Display in Weaver Dashboard

**Priority 1 - Core Engagement (Always Show):**
1. **Engagement Rate** - Primary KPI for content performance
2. **View Count** - Reach indicator
3. **Follower Growth** - Track over time with trend line
4. **Top Performing Videos** - Sort by engagement rate

**Priority 2 - Content Insights:**
1. **Content Performance Comparison** - This video vs account average
2. **Posting Frequency** - Videos per week/month
3. **Best Posting Times** - When your top content was published
4. **Content Type Analysis** - Performance by hashtags/themes used

**Priority 3 - Engagement Breakdown:**
1. **Like/Comment/Share Ratios** - Understand what drives engagement
2. **Comment Analysis** - If using Research API, sentiment and topic analysis
3. **Engagement Timeline** - When engagement happened after posting

**Priority 4 - Advanced (Research API):**
1. **Trending Sounds/Effects** - What's working in your niche
2. **Hashtag Performance** - Which hashtags drive results
3. **Geographic Performance** - Where your content resonates

### Complete Calculated Metrics Reference

These are the metrics Weaver must calculate from API data to provide actionable insights:

#### Core Engagement Metrics (All APIs)

**Engagement Rate**
```
(likes + comments + shares + saves) / views × 100
```
*Primary KPI for content performance. Industry benchmark: 3-9% is good, 10%+ is excellent*

**Video Performance Score**
```
(engagement_rate × 0.5) + (view_count / follower_count × 0.3) + (share_rate × 0.2)
```
*Composite score weighing engagement, reach, and virality*

**Share Rate (Virality Indicator)**
```
shares / views × 100
```
*Higher share rate = more viral potential. 1%+ is strong*

**Comment Rate**
```
comments / views × 100
```
*Indicates conversation and community engagement*

**Like Rate**
```
likes / views × 100
```
*Baseline engagement metric*

**Save Rate**
```
saves / views × 100
```
*(Organic/Research API only) Indicates valuable/reference content*

#### Growth & Profile Metrics

**Follower Growth Rate**
```
(current_followers - previous_followers) / previous_followers × 100
```
*Track over time periods (daily, weekly, monthly). Store historical data required*

**Follower Growth Velocity**
```
(current_period_growth - previous_period_growth) / previous_period_growth × 100
```
*Acceleration/deceleration of growth. Positive = accelerating*

**Profile Visit Rate** (Organic API only)
```
profile_views / video_views × 100
```
*How many viewers check out your profile. 5-15% is typical*

**Follower Conversion Rate** (Organic API only)
```
new_followers / profile_views × 100
```
*Profile visit → follow conversion. 10-30% is strong*

**Content Volume**
```
video_count / days_active
```
*Average posting frequency*

#### Watch Time & Retention (Organic API Only)

**Average Watch Percentage**
```
average_time_watched / video_duration × 100
```
*Critical algorithm signal. 50%+ is good, 70%+ is excellent*

**Completion Rate**
```
full_video_watched_rate × 100
```
*Percentage who watched entire video. Directly from API as decimal, convert to %*

**Total Watch Hours**
```
total_time_watched / 3600
```
*Cumulative watch time in hours. Good for trending content identification*

**Retention Score**
```
(average_watch_percentage × 0.6) + (completion_rate × 0.4)
```
*Composite retention metric weighing average watch and completion*

**Estimated Rewatch Rate**
```
(total_time_watched / video_duration) - view_count
```
*If positive, indicates rewatches. Rough estimate only*

#### Comparative & Trend Metrics

**Video vs Account Average**
```
video_metric / average_of_all_videos_metric × 100
```
*Show as "X% above/below average" for any metric*

**Performance Percentile**
```
rank(video, all_videos_by_metric) / total_videos × 100
```
*"Top 10% of your content" messaging*

**Week-over-Week Change**
```
(current_week_metric - previous_week_metric) / previous_week_metric × 100
```
*Trend indicator for any metric*

**Moving Average (7-day, 30-day)**
```
sum(metric_last_n_days) / n
```
*Smooth out noise, show trends*

**Performance Volatility**
```
standard_deviation(video_metrics) / mean(video_metrics)
```
*Consistency indicator. Lower = more consistent performance*

#### Content Strategy Metrics

**Best Posting Time**
```
group_by(video.create_time.hour) → calculate avg(engagement_rate)
```
*Identify optimal posting hours based on historical performance*

**Best Performing Content Type**
```
group_by(video.duration_bucket) → calculate avg(engagement_rate)
```
*Short (<30s) vs Medium (30-60s) vs Long (>60s) performance*

**Hashtag Performance** (Research API only)
```
group_by(hashtag) → calculate avg(views, engagement_rate)
```
*Which hashtags correlate with better performance*

**Sound/Music Performance** (Research API only)
```
group_by(music_id) → calculate avg(views, engagement_rate)
```
*Trending sounds that work for your content*

**Effect Performance** (Research API only)
```
group_by(effect_id) → calculate avg(views, engagement_rate)
```
*Which effects drive engagement*

#### Audience & Reach Metrics (Organic API Only)

**Reach Rate**
```
reach / followers × 100
```
*What % of followers you're reaching. 20-40% is typical*

**Impressions to Views Rate**
```
views / impressions × 100
```
*CTR from feed to video. 5-15% is typical*

**Engagement per Follower**
```
total_engagement / followers
```
*Average engagement per follower over period*

**Virality Coefficient**
```
(views - (followers × reach_rate)) / views × 100
```
*Estimated % of views from non-followers. Higher = more viral*

**Accounts Engaged Rate**
```
accounts_engaged_per_day / impressions_per_day × 100
```
*% of people who saw content and engaged*

#### Ad Performance Metrics (Marketing API Only)

**Return on Ad Spend (ROAS)**
```
revenue / spend
```
*Primary ROI metric. 3.0+ is typically profitable*

**Cost Per Engagement**
```
spend / engagements
```
*Efficiency metric for brand awareness campaigns*

**Video Completion Rate (Ads)**
```
video_watched_100% / video_play_actions × 100
```
*Ad creative quality indicator*

**View-to-Click Rate**
```
clicks / impressions × 100
```
*Same as CTR but more intuitive naming*

**Attribution Efficiency**
```
(cta_conversions × cta_value + vta_conversions × vta_value) / spend
```
*Blended attribution ROAS*

**Incremental Conversions**
```
total_conversions - baseline_conversions
```
*Conversions above organic baseline*

### Implementation Notes for Weaver

**Data Storage Requirements:**
- Store historical snapshots of profile and video metrics (daily recommended)
- Track follower count changes to calculate growth rates
- Store video creation timestamps to calculate time-based trends
- Cache calculated metrics to avoid repeated computation

**Calculation Frequency:**
- Real-time: Engagement rates, watch percentages (on data fetch)
- Daily: Growth rates, moving averages, posting frequency
- Weekly: Content strategy insights, comparative analysis
- Monthly: Long-term trends, performance volatility

**Display Best Practices:**
- Always show trend direction (↑↓) and percentage change
- Provide context: "X% above your average"
- Use color coding: green for above average, red for below
- Show confidence intervals for small sample sizes
- Flag insufficient data: "Need 10+ videos for this insight"

### Detailed API Field Reference

## TikTok APIs

### Display API

#### User Info (`/v2/user/info/`)

**Basic Profile** (scope: `user.info.basic`):
- `open_id` - Unique identifier for the user
- `union_id` - Unified user identifier across apps
- `avatar_url` - Profile picture URL
- `avatar_url_100` - 100x100 avatar URL
- `avatar_large_url` - Large avatar URL
- `display_name` - User's display name

**Profile Info** (scope: `user.info.profile`):
- `bio_description` - User bio/description
- `profile_deep_link` - Deep link to profile
- `is_verified` - Verification status
- `username` - TikTok handle

**Stats** (scope: `user.info.stats`):
- `follower_count` - Number of followers
- `following_count` - Number of accounts following
- `likes_count` - Total likes received
- `video_count` - Total number of videos

#### Video Query (`/v2/video/query/`)

**Video Metadata** (scope: `video.list`):
- `id` - Unique video identifier
- `create_time` - Unix timestamp of creation
- `cover_image_url` - Thumbnail URL (6-hour TTL)
- `share_url` - Public share URL
- `video_description` - Caption/description
- `duration` - Video length in seconds
- `height` - Video height in pixels
- `width` - Video width in pixels
- `title` - Video title
- `embed_html` - HTML embed code
- `embed_link` - Embed link

**Video Stats**:
- `like_count` - Number of likes
- `comment_count` - Number of comments
- `share_count` - Number of shares
- `view_count` - Number of views

### Content Posting API

#### Query Creator Info (`/v2/post/publish/creator_info/query/`)

**Rate limit**: 20 requests per minute per user access token

**Available Fields**:
- `creator_avatar_url` - Creator's avatar (2-hour TTL)
- `creator_username` - Unique creator ID
- `creator_nickname` - Display name
- `privacy_level_options` - Available privacy levels for posts
- `comment_disabled` - Comments disabled status
- `duet_disabled` - Duet disabled status
- `stitch_disabled` - Stitch disabled status
- `max_video_post_duration_sec` - Maximum video length allowed

### Research API

**Note**: Research API requires special approval and is intended for academic/research purposes. Requires affiliation with academic or not-for-profit research institution and approved research proposal.

**Scope required**: `research.data.basic`

#### Query Videos (`/v2/research/video/query/`)

**Daily limits**: 1,000 requests, 100,000 records

**Available Fields**:
- `id` - Video identifier
- `video_description` - Video caption
- `create_time` - Creation timestamp
- `region_code` - Region/country code
- `share_count` - Share count
- `view_count` - View count
- `like_count` - Like count
- `comment_count` - Comment count
- `favorites_count` - Favorites/bookmarks count
- `music_id` - Background music ID
- `hashtag_names` - Array of hashtag strings
- `hashtag_info_list` - Detailed hashtag metadata
- `username` - Creator username
- `effect_ids` - Applied effect IDs
- `effect_info_list` - Detailed effect metadata
- `sticker_info_list` - Sticker metadata
- `playlist_id` - Associated playlist ID
- `voice_to_text` - Transcribed audio text
- `is_stem_verified` - STEM content verification status
- `video_duration` - Video length
- `video_mention_list` - Mentioned users
- `video_label` - Content labels
- `video_tag` - Content tags

**Query Parameters**:
- Max 30-day date range per request
- Max 100 videos per request
- Supports AND/OR/NOT filter logic

#### Query User Info (`/v2/research/user/info/`)

**Available Fields**:
- `display_name` - User's display name/nickname
- `bio_description` - Bio description
- `avatar_url` - Profile picture URL
- `is_verified` - Verified status
- `follower_count` - Number of followers
- `following_count` - Number following
- `likes_count` - Total likes received
- `video_count` - Number of posted videos
- `bio_url` - URL in bio

#### Query Video Comments (`/v2/research/video/comment/list/`)


# Seperate

**Rate limit**: Max 100 comments per request, limited to top 1,000 comments per video

**Available Fields**:
- `id` - Comment identifier
- `video_id` - Associated video ID
- `text` - Comment text (PII auto-redacted)
- `like_count` - Comment likes
- `reply_count` - Number of replies
- `parent_comment_id` - Parent comment if reply
- `create_time` - Comment timestamp

#### User Engagement Endpoints

**Available but require approval**:
- Query User Liked Videos
- Query User Pinned Videos
- Query User Reposted Videos
- Query User Followers (max 100 per request, 20k calls/day, 2M records/day)
- Query User Following (max 100 per request, 20k calls/day, 2M records/day)
- Query Playlist Info

### Commercial Content API

**Note**: For querying public ad data, useful for competitive analysis and brand monitoring.

#### Query Ads (`/v2/research/adlib/ad/query`)

**Rate limit**: Max 50 results per request

**Available Fields**:

**Ad Data**:
- `ad.id` - Ad identifier
- `ad.first_shown_date` - First appearance date
- `ad.last_shown_date` - Last appearance date
- `ad.status` - Current ad status
- `ad.status_statement` - Status description
- `ad.videos` - Video assets
- `ad.image_urls` - Image assets
- `ad.reach` - Audience reach

**Advertiser Data**:
- `advertiser.business_id` - Business identifier
- `advertiser.business_name` - Business name
- `advertiser.paid_for_by` - Funding disclosure

**Query Parameters**:
- `search_term` - Keyword search (max 50 chars)
- Filters: publication date, country code, business IDs, reach range
- Data available for ad runtime + 1 year after

### Data Portability API

**Note**: Currently limited to EEA users only. For comprehensive user data export, not real-time analytics.

**Available Data Categories**:

**Profile & Posts**:
- Profile: username, email, phone, DOB, bio, profile media
- Following/Follower lists with dates
- Posts: video links, titles, permissions, settings, location, sound, AI disclosure

**Activity**:
- Comments, favorite effects, hashtags, sounds
- Purchase history, gifts received
- Like list, browsing history, search history
- Location reviews (regional availability)

**Direct Messages**:
- Chat history with dates, senders, content

**Full Archive**:
- All above + linked accounts, app settings, privacy controls






## API Rate Limits

TikTok API v2 has the following limits:
- **600 requests per minute** per access token
- User info, video list, and video query all count towards this limit

## Security Notes

1. **Never expose client secret** in client-side code
2. **Always use PKCE** for OAuth flow (already implemented)
3. **Verify state parameter** to prevent CSRF attacks
4. **Store tokens encrypted** in Supabase (consider using pgcrypto)
5. **Refresh tokens** before expiry to maintain access

## Troubleshooting

### "Invalid redirect URI" error
- TikTok does NOT support localhost - you must use ngrok
- Ensure redirect URI in TikTok dashboard exactly matches your ngrok URL
- Format: `https://your-ngrok-url.ngrok.io/accounts/callback/tiktok`
- No trailing slashes, query params, or fragments allowed
- Update `.env.local` with your current ngrok URL (changes each restart unless you have a paid plan)

### "Invalid scope" error
- Verify all requested scopes are enabled in TikTok app settings
- Some scopes require app review/approval

### "Token expired" error
- Implement token refresh logic (included in oauth.ts)
- Access tokens typically expire in 24 hours
- Refresh tokens last ~1 year

### Rate limit errors (429)
- Implement request queuing
- Cache responses when possible
- Show user-friendly "Fetching..." state

## References

- [TikTok API Documentation](https://developers.tiktok.com/doc)
- [Login Kit Web Guide](https://developers.tiktok.com/doc/login-kit-web)
- [OAuth 2.0 v2 Migration Guide](https://developers.tiktok.com/bulletin/migration-guidance-oauth-v1)
