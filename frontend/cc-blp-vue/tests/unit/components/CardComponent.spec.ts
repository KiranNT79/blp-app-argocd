import { mount } from "@vue/test-utils";
import CardComponent from '@/components/CardComponent.vue';

describe('CardComponent.vue',   ()=>{
    it('renders card title',()=>{
        const wrapper = mount(CardComponent,{
            props:{ title: 'title', variant: 'neutral', content:'content' }
        });
        expect(wrapper.find('.title').text()).toMatch('title');
    });

    it('renders card content',()=>{
        const wrapper = mount(CardComponent,{
            props:{ title: 'title', variant: 'neutral', content:'content' }
        });
        expect(wrapper.find('.content').text()).toMatch('content');
    });

    it('renders card variant',()=>{
        const wrapper = mount(CardComponent,{
            props:{ title: 'title', variant: 'neutral', content:'content' }
        });
        expect(wrapper.find('div.card').classes()).toContain('neutral')
    });
});