import { mount } from '@vue/test-utils';
import App from '@/App.vue';

// Mock components
jest.mock('@/components/shell-layout/Header.vue', () => ({
  name: 'UIHeader',
  template: '<div class="mock-header">Mock Header</div>',
}));

jest.mock('@/components/shell-layout/Footer.vue', () => ({
  name: 'UIFooter',
  template: '<div class="mock-footer">Mock Footer</div>',
}));

jest.mock('@/views/DashboardView.vue', () => ({
  name: 'DashboardView',
  template: '<div class="mock-dashboard-view">Mock Dashboard View</div>',
}));

jest.mock('@dlcm/cc-ui-utils-style', () => ({
  loadModule: jest.fn(() => Promise.resolve('Mocked Module')),
}));

describe('App.vue', () => {
  it('renders UI components correctly', async () => {
    const wrapper = mount(App);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.mock-header').exists()).toBe(true);
    expect(wrapper.find('.mock-footer').exists()).toBe(true);
    expect(wrapper.find('.mock-dashboard-view').exists()).toBe(true);
  });
});
