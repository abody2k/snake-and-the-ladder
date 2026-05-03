// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		userJoined: any,
		gameUpdated: any,
		play: any,
		init: any,
		godotReady: any,
		ev: Event,
	}
}

export { };
