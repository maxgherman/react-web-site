import React from 'react';
import renderer from 'react-test-renderer';
import { Page } from '.';

describe('<Page /> component', () => {

    it('should render root element', () => {

        const component = renderer.create(<Page />);
        const instance = component.root;

        expect(instance.findByProps({ className: 'page' }).type).toBe('div');

        // component.toJSON()
    });
});
