require 'rails_helper'

RSpec.describe 'show sell information', type: :feature, js: true do
  describe 'test' do
    before { visit root_path }

    it 'test' do
      expect(page).to have_content 'test'
    end
  end
end