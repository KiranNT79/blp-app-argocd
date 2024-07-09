import { of } from 'rxjs';

export const initUser = jest.fn();
export const getUser$ = of(JSON.stringify({ name: 'Test User' }));
