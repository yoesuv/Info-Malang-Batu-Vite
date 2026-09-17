/**
 * Single source of truth for the app version shown in the UI.
 *
 * Keep it in sync with `package.json` -> `version` when releasing.
 * (We avoid importing `package.json` here so the file stays out of the
 * client bundle and `tsc -b` doesn't need `resolveJsonModule`.)
 */
export const APP_VERSION = '1.0.0'

/** Human label for the current release, shown as a badge next to the version. */
export const APP_VERSION_TAG = 'Initial release'
