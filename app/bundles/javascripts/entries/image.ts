// image_bundle_tagで画像を使うため一括import
// <%= image_bundle_tag 'webpack-logo.svg' %>
function allRequire(context: any): void {
  context.keys().forEach(context);
}
allRequire((require as any).context('@image/', true, /\.*/));
