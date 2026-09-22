/**
 * Shared surface styling for Dialog and AlertDialog — visually identical,
 * only their Radix behavior/semantics differ (see each component's own
 * file). Radius/shadow/z-index per DESIGN §13/§25.5/§25.9 (Card/dialog →
 * xl, Dialog/sheet → shadow-lg, overlay → 30, modal → 40).
 */
export const DIALOG_OVERLAY_CLASSES = 'fixed inset-0 z-overlay bg-black/50'

export const DIALOG_CONTENT_CLASSES =
	'fixed top-1/2 left-1/2 z-modal grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-lg sm:max-w-lg'
