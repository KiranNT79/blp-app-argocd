import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Render React MFE Dashboard', () => {
    it('render dashboard page', () => {
        const app = <Dashboard />;
        const { getByText } = render(app);
        expect(getByText('Welcome to your MFE React Dashboard.')).toBeInTheDocument();
    });
})