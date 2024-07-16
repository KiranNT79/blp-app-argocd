import { mount, VueWrapper } from '@vue/test-utils';
import AppCampaigns from '@/views/CampaignsView.vue';
import TableComponent from '@/components/TableComponent.vue';

declare const global: {
    fetch: jest.Mock<any, any>; 
  };

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          brand: 'Brand 1',
          title: 'Campaign 1',
          type: 'Type A',
          state: 'Active',
          changedAt: '2024-01-01',
          changedBy: 'User',
        }
      ]),
  })
);

describe('AppCampaigns.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    wrapper = mount(AppCampaigns, {
      global: {
        mocks: {
          fetch: global.fetch,
        },
      },
    });

    await wrapper.vm.$nextTick(); 
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('renders Campaigns title', () => {
    expect(wrapper.find('h1').text()).toBe('Campaigns');
  });

  it('renders TableComponent with data', () => {
    const tableComponent = wrapper.findComponent(TableComponent);
    expect(tableComponent.exists()).toBe(true);
    expect(tableComponent.props('columnDef')).toEqual([
      { field: 'brand', name: 'Brand' },
      { field: 'title', name: 'Title' },
      { field: 'type', name: 'Technology' },
      { field: 'state', name: 'Status' },
      { field: 'changedAt', name: 'Last Modified' },
      { field: 'changedBy', name: 'Last Modified By' },
    ]);
    expect(tableComponent.props('data')).toHaveLength(1); 
  });


  it('handles error when fetch fails', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('API failure'));
    wrapper = mount(AppCampaigns, {
        global: {
          mocks: {
            fetch: global.fetch,
          },
        },
      });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dlmData).toEqual(null); 
  });
});
