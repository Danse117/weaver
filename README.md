# Weaver-App





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
