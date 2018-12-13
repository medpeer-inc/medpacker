require 'rails_helper'

RSpec.describe 'show sell information', type: :feature, js: true do
  describe 'test' do
    before { visit root_path }

    it 'title' do
      expect(page).to have_content 'Rails and webpack template!'
    end
  end
end
