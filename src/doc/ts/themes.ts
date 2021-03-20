import {Theme} from './panepaint';

export type ThemeId =
	| 'default'
	| 'iceberg'
	| 'jetblack'
	| 'light'
	| 'retro'
	| 'translucent';

const ID_TO_THEME_MAP: {[id in ThemeId]: () => Theme} = {
	default: () => ({
		'base-background-color': 'hsla(230, 7%, 20%, 1)',
		'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
		'button-background-color': 'hsla(230, 7%, 70%, 1)',
		'button-background-color-active': 'hsla(230, 7%, 85%, 1)',
		'button-background-color-focus': 'hsla(230, 7%, 80%, 1)',
		'button-background-color-hover': 'hsla(230, 7%, 75%, 1)',
		'button-foreground-color': 'hsla(230, 7%, 20%, 1)',
		'folder-background-color': 'hsla(230, 7%, 80%, 0.1)',
		'folder-background-color-active': 'hsla(230, 7%, 80%, 0.25)',
		'folder-background-color-focus': 'hsla(230, 7%, 80%, 0.2)',
		'folder-background-color-hover': 'hsla(230, 7%, 80%, 0.15)',
		'folder-foreground-color': 'hsla(230, 7%, 80%, 1)',
		'input-background-color': 'hsla(230, 7%, 80%, 0.1)',
		'input-background-color-active': 'hsla(230, 7%, 80%, 0.25)',
		'input-background-color-focus': 'hsla(230, 7%, 80%, 0.2)',
		'input-background-color-hover': 'hsla(230, 7%, 80%, 0.15)',
		'input-foreground-color': 'hsla(230, 7%, 80%, 1)',
		'monitor-background-color': 'hsla(230, 7%, 0%, 0.2)',
		'monitor-foreground-color': 'hsla(230, 7%, 80%, 0.7)',
		'label-foreground-color': 'hsla(230, 7%, 80%, 0.7)',
		'separator-color': 'hsla(230, 7%, 0%, 0.2)',
	}),
	jetblack: () => ({
		'base-background-color': 'hsla(0, 0%, 0%, 1)',
		'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
		'button-background-color': 'hsla(0, 0%, 70%, 1)',
		'button-background-color-active': 'hsla(0, 0%, 85%, 1)',
		'button-background-color-focus': 'hsla(0, 0%, 80%, 1)',
		'button-background-color-hover': 'hsla(0, 0%, 75%, 1)',
		'button-foreground-color': 'hsla(0, 0%, 0%, 1)',
		'folder-background-color': 'hsla(0, 0%, 10%, 1)',
		'folder-background-color-active': 'hsla(0, 0%, 25%, 1)',
		'folder-background-color-focus': 'hsla(0, 0%, 20%, 1)',
		'folder-background-color-hover': 'hsla(0, 0%, 15%, 1)',
		'folder-foreground-color': 'hsla(0, 0%, 50%, 1)',
		'input-background-color': 'hsla(0, 0%, 10%, 1)',
		'input-background-color-active': 'hsla(0, 0%, 25%, 1)',
		'input-background-color-focus': 'hsla(0, 0%, 20%, 1)',
		'input-background-color-hover': 'hsla(0, 0%, 15%, 1)',
		'input-foreground-color': 'hsla(0, 0%, 70%, 1)',
		'monitor-background-color': 'hsla(0, 0%, 8%, 1)',
		'monitor-foreground-color': 'hsla(0, 0%, 48%, 1)',
		'label-foreground-color': 'hsla(0, 0%, 50%, 1)',
		'separator-color': 'hsla(0, 0%, 10%, 1)',
	}),
	light: () => ({
		'base-background-color': 'hsla(230, 5%, 90%, 1)',
		'base-shadow-color': 'hsla(0, 0%, 0%, 0.1)',
		'button-background-color': 'hsla(230, 7%, 75%, 1)',
		'button-background-color-active': 'hsla(230, 7%, 60%, 1)',
		'button-background-color-focus': 'hsla(230, 7%, 65%, 1)',
		'button-background-color-hover': 'hsla(230, 7%, 70%, 1)',
		'button-foreground-color': 'hsla(230, 10%, 30%, 1)',
		'folder-background-color': 'hsla(230, 15%, 30%, 0.2)',
		'folder-background-color-active': 'hsla(230, 15%, 30%, 0.32)',
		'folder-background-color-focus': 'hsla(230, 15%, 30%, 0.28)',
		'folder-background-color-hover': 'hsla(230, 15%, 30%, 0.24)',
		'folder-foreground-color': 'hsla(230, 10%, 30%, 1)',
		'input-background-color': 'hsla(230, 15%, 30%, 0.1)',
		'input-background-color-active': 'hsla(230, 15%, 30%, 0.22)',
		'input-background-color-focus': 'hsla(230, 15%, 30%, 0.18)',
		'input-background-color-hover': 'hsla(230, 15%, 30%, 0.14)',
		'input-foreground-color': 'hsla(230, 10%, 30%, 1)',
		'monitor-background-color': 'hsla(230, 15%, 30%, 0.1)',
		'monitor-foreground-color': 'hsla(230, 10%, 30%, 0.5)',
		'label-foreground-color': 'hsla(230, 10%, 30%, 0.7)',
		'separator-color': 'hsla(230, 15%, 30%, 0.1)',
	}),
	iceberg: () => ({
		'base-background-color': 'hsla(230, 20%, 11%, 1)',
		'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
		'button-background-color': 'hsla(230, 10%, 80%, 1)',
		'button-background-color-active': 'hsla(230, 10%, 95%, 1)',
		'button-background-color-focus': 'hsla(230, 10%, 90%, 1)',
		'button-background-color-hover': 'hsla(230, 10%, 85%, 1)',
		'button-foreground-color': 'hsla(230, 20%, 11%, 1)',
		'folder-background-color': 'hsla(230, 25%, 16%, 1)',
		'folder-background-color-active': 'hsla(230, 25%, 31%, 1)',
		'folder-background-color-focus': 'hsla(230, 25%, 26%, 1)',
		'folder-background-color-hover': 'hsla(230, 25%, 21%, 1)',
		'folder-foreground-color': 'hsla(230, 10%, 80%, 1)',
		'input-background-color': 'hsla(230, 20%, 8%, 1)',
		'input-background-color-active': 'hsla(230, 28%, 23%, 1)',
		'input-background-color-focus': 'hsla(230, 28%, 18%, 1)',
		'input-background-color-hover': 'hsla(230, 20%, 13%, 1)',
		'input-foreground-color': 'hsla(230, 10%, 80%, 1)',
		'monitor-background-color': 'hsla(230, 20%, 8%, 1)',
		'monitor-foreground-color': 'hsla(230, 12%, 48%, 1)',
		'label-foreground-color': 'hsla(230, 12%, 48%, 1)',
		'separator-color': 'hsla(230, 20%, 8%, 1)',
	}),
	retro: () => ({
		'base-background-color': 'hsla(40, 3%, 90%, 1)',
		'base-shadow-color': 'hsla(0, 0%, 0%, 0.3)',
		'button-background-color': 'hsla(40, 3%, 70%, 1)',
		'button-background-color-active': 'hsla(40, 3%, 55%, 1)',
		'button-background-color-focus': 'hsla(40, 3%, 60%, 1)',
		'button-background-color-hover': 'hsla(40, 3%, 65%, 1)',
		'button-foreground-color': 'hsla(40, 3%, 20%, 1)',
		'folder-background-color': 'hsla(40, 3%, 40%, 1)',
		'folder-background-color-active': 'hsla(34, 3%, 55%, 1)',
		'folder-background-color-focus': 'hsla(43, 3%, 50%, 1)',
		'folder-background-color-hover': 'hsla(43, 3%, 45%, 1)',
		'folder-foreground-color': 'hsla(40, 3%, 70%, 1)',
		'input-background-color': 'hsla(120, 3%, 20%, 1)',
		'input-background-color-active': 'hsla(120, 3%, 35%, 1)',
		'input-background-color-focus': 'hsla(120, 3%, 30%, 1)',
		'input-background-color-hover': 'hsla(120, 3%, 25%, 1)',
		'input-foreground-color': 'hsla(120, 40%, 60%, 1)',
		'monitor-background-color': 'hsla(120, 3%, 20%, 0.8)',
		'monitor-foreground-color': 'hsla(120, 40%, 60%, 0.8)',
		'label-foreground-color': 'hsla(40, 3%, 50%, 1)',
		'separator-color': 'hsla(40, 3%, 40%, 1)',
	}),
	translucent: () => ({
		'base-background-color': 'hsla(0, 0%, 10%, 0.8)',
		'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
		'button-background-color': 'hsla(0, 0%, 80%, 1)',
		'button-background-color-active': 'hsla(0, 0%, 100%, 1)',
		'button-background-color-focus': 'hsla(0, 0%, 95%, 1)',
		'button-background-color-hover': 'hsla(0, 0%, 85%, 1)',
		'button-foreground-color': 'hsla(0, 0%, 0%, 0.8)',
		'folder-background-color': 'hsla(0, 0%, 0%, 0.3)',
		'folder-background-color-active': 'hsla(0, 0%, 0%, 0.6)',
		'folder-background-color-focus': 'hsla(0, 0%, 0%, 0.5)',
		'folder-background-color-hover': 'hsla(0, 0%, 0%, 0.4)',
		'folder-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
		'input-background-color': 'hsla(0, 0%, 0%, 0.3)',
		'input-background-color-active': 'hsla(0, 0%, 0%, 0.6)',
		'input-background-color-focus': 'hsla(0, 0%, 0%, 0.5)',
		'input-background-color-hover': 'hsla(0, 0%, 0%, 0.4)',
		'input-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
		'monitor-background-color': 'hsla(0, 0%, 0%, 0.3)',
		'monitor-foreground-color': 'hsla(0, 0%, 100%, 0.3)',
		'label-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
		'separator-color': 'hsla(0, 0%, 0%, 0.2)',
	}),
};

export function createTheme(id: ThemeId): Theme {
	return ID_TO_THEME_MAP[id]();
}
