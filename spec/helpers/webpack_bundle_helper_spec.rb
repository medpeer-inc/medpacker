require 'rails_helper'

RSpec.describe WebpackBundleHelper, type: :helper do
  before do
    manifest = {
      "item_group_editor.css": '/bundles/item_group_editor-5d7c7164b8a0a9d675fad9ab410eaa8d.css',
      "item_group_editor.js": '/bundles/item_group_editor-857e5bfa272e71b6384046f68ba29d44.js',
      "item_group_editor.js.map": '/bundles/item_group_editor.js.map',
      "union-ok.png": '/bundles/union-ok-857e5bfa272e71b6384046f68ba29d44.png',
      "union-ok@2x.png": '/bundles/union-ok@2x-5d7c7164b8a0a9d675fad9ab410eaa8d.png'
    }.stringify_keys

    allow_any_instance_of(WebpackBundleHelper).to receive(:manifest).and_return(manifest)
  end

  describe '#asset_bundle_path' do
    context 'given existing *.js entry name' do
      subject { asset_bundle_path('item_group_editor.js') }

      it 'returns actual file name' do
        is_expected.to eq '/bundles/item_group_editor-857e5bfa272e71b6384046f68ba29d44.js'
      end
    end

    context 'given existing *.css entry name' do
      subject { asset_bundle_path('item_group_editor.css') }

      it 'returns actual file name' do
        is_expected.to eq '/bundles/item_group_editor-5d7c7164b8a0a9d675fad9ab410eaa8d.css'
      end
    end

    context 'given non-existing entry name' do
      subject do
        -> { asset_bundle_path('not_found.js') }
      end

      it 'raises' do
        is_expected.to raise_error WebpackBundleHelper::BundleNotFound
      end
    end
  end

  describe '#javascript_bundle_tag' do
    context 'given existing *.js entry name' do
      subject { javascript_bundle_tag('item_group_editor') }

      it 'renders a nice <script> tag' do
        is_expected.to eq '<script src="/bundles/item_group_editor-857e5bfa272e71b6384046f68ba29d44.js" defer="defer"></script>'
      end
    end

    context 'given existing *.js entry name with async' do
      subject { javascript_bundle_tag('item_group_editor', async: true) }

      it 'renders a nice <script> tag' do
        is_expected.to eq '<script src="/bundles/item_group_editor-857e5bfa272e71b6384046f68ba29d44.js" async="async"></script>'
      end
    end

    context 'given non-existing *.js entry name' do
      subject do
        -> { javascript_bundle_tag('not_found') }
      end

      it 'raises' do
        is_expected.to raise_error WebpackBundleHelper::BundleNotFound
      end
    end
  end

  describe '#stylesheet_bundle_tag' do
    context 'given existing *.css entry name' do
      subject { stylesheet_bundle_tag('item_group_editor') }

      it 'renders a nice <link> tag' do
        is_expected.to eq '<link rel="stylesheet" media="screen" href="/bundles/item_group_editor-5d7c7164b8a0a9d675fad9ab410eaa8d.css" />'
      end
    end

    context 'given non-existing *.css entry name' do
      subject do
        -> { stylesheet_bundle_tag('not_found') }
      end

      it 'raises' do
        is_expected.to raise_error WebpackBundleHelper::BundleNotFound
      end
    end
  end

  describe '#image_bundle_tag' do
    context 'given existing *.png entry name' do
      subject { image_bundle_tag('union-ok.png') }

      it 'renders a nice <img> tag' do
        is_expected.to eq '<img src="/bundles/union-ok-857e5bfa272e71b6384046f68ba29d44.png" />'
      end
    end

    context 'given non-existing *.png entry name' do
      subject do
        -> { image_bundle_tag('not_found.png') }
      end

      it 'raises' do
        is_expected.to raise_error WebpackBundleHelper::BundleNotFound
      end
    end

    context 'given without extname' do
      subject do
        -> { image_bundle_tag('not_found') }
      end

      it 'raises' do
        is_expected.to raise_error ArgumentError
      end
    end
  end
end