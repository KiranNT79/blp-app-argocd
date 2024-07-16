import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import RemoteApp from '@/views/RemoteApp.vue';

jest.mock('@dlcm/cc-ui-utils-store-user', () => ({
  initUser: jest.fn(),
  getUser$: jest.fn()
}));


// Testing for mocked routes
const routes = [
  {
    path: '/',
    component: {
      template: '<div>Home</div>'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('App.vue', () => {
  it('renders RouterView', async () => {
    const wrapper = mount(RemoteApp, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();

    expect(wrapper.html()).toContain('<div>Home</div>');
  });
});
