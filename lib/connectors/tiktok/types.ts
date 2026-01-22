// TikTok OAuth types
export interface TikTokOAuthTokenResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	refresh_expires_in: number;
	open_id: string;
	scope: string;
	token_type: string;
}

export interface TikTokRefreshTokenResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	refresh_expires_in: number;
	open_id: string;
	scope: string;
	token_type: string;
}

// TikTok User types
export interface TikTokUser {
	open_id: string;
	union_id?: string;
	avatar_url?: string;
	avatar_url_100?: string;
	avatar_large_url?: string;
	display_name?: string;
	username?: string;
	bio_description?: string;
	is_verified?: boolean;
	profile_deep_link?: string;
	follower_count?: number;
	following_count?: number;
	likes_count?: number;
	video_count?: number;
}

export interface TikTokUserInfoResponse {
	data: {
		user: TikTokUser;
	};
	error: {
		code: string;
		message: string;
		log_id: string;
	};
}

// TikTok Video types
export interface TikTokVideo {
	id: string;
	create_time: number;
	cover_image_url?: string;
	share_url?: string;
	video_description?: string;
	title?: string;
	duration?: number;
	height?: number;
	width?: number;
	view_count?: number;
	like_count?: number;
	comment_count?: number;
	share_count?: number;
	download_count?: number;
}

export interface TikTokVideoListResponse {
	data: {
		videos: TikTokVideo[];
		cursor: number;
		has_more: boolean;
	};
	error: {
		code: string;
		message: string;
		log_id: string;
	};
}

export interface TikTokVideoQueryResponse {
	data: {
		videos: TikTokVideo[];
	};
	error: {
		code: string;
		message: string;
		log_id: string;
	};
}

// PKCE types
export interface PKCEChallenge {
	code_verifier: string;
	code_challenge: string;
}

// OAuth state
export interface OAuthState {
	state: string;
	code_verifier: string;
	redirect_to?: string;
}
