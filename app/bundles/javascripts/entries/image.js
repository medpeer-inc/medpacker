// image_bundle_tagで画像を使うため一括import
// <%= image_bundle_tag 'webpack-logo.svg' %>
function allRequire(context) {
	context.keys().forEach(context);
}
allRequire((require).context('@image/', true, /\.*/));
