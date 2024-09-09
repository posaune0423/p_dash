/// APP_KEY must be unique across the entire platform
pub const APP_KEY: felt252 = 'p_dash';

/// Core only supports unicode icons for now
pub const APP_ICON: felt252 = 'U+1F3AE';

/// prefixing with BASE means using the server's default manifest.json handler
pub const APP_MANIFEST: felt252 = 'BASE/manifests/p_dash';

// width and height should be set by the frontend in the future.
pub const STAGE_DEFAULT_WIDTH: u32 = 10;
pub const STAGE_DEFAULT_HEIGHT: u32 = 10;