/**
 * Shared utility: Format Unix timestamp to readable date
 * Used across all platform content displays
 */

export function formatDate(timestamp: number): string {
	const date = new Date(timestamp * 1000);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}
