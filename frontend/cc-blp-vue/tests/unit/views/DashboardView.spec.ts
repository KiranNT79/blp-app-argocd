import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import AppDashboard from '@/views/DashboardView.vue';
import { createRouter, createWebHistory, RouterLink } from 'vue-router';

jest.mock('rxjs', () => ({
  ...jest.requireActual('rxjs'),
  firstValueFrom: jest.fn(),
}));

const { firstValueFrom } = require('rxjs');

// Mock routes
const routes = [
  {
    path: '/blp-vue/campaigns',
    name: 'Campaigns',
    component: { template: '<div>Campaigns</div>' }
  },
  {
    path: '/',
    name: 'Home',
    component: { template: '<div>Home</div>' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('AppDashboard.vue', () => {
  beforeEach(() => {
    // Clear all mocks
    (firstValueFrom as jest.Mock).mockClear();
    (firstValueFrom as jest.Mock).mockResolvedValue(JSON.stringify({ name: 'Test User' }));
  });

  it('fetches and displays the username', async () => {
    // Mock the user data
    const mockUser = JSON.stringify({ name: 'Test User' });
    (firstValueFrom as jest.Mock).mockResolvedValueOnce(mockUser);

    const wrapper = mount(AppDashboard, {
      global: {
        mocks: {
          $firstValueFrom: firstValueFrom,
        },
        plugins: [router],
      },
    });

    await nextTick();
    await nextTick(); 
    await nextTick();
    await nextTick();

    expect(wrapper.find('.user-info').text()).toBe('Hello, Test User');
  });

  it('renders RouterLink with the correct URL', () => {
    const wrapper = mount(AppDashboard, {
      global: {
        mocks: {
          $firstValueFrom: firstValueFrom,
        },
        plugins: [router],
      },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.props('to')).toBe('/blp-vue/campaigns');
  });

});
