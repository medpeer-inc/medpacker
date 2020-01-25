import { mount } from '@vue/test-utils';
jest.mock('@image/medbear.png', () => 'test.png');
import Target from '@js/components/HelloMedbear.vue';

describe('@js/components/HelloMedbear', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Target);
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
