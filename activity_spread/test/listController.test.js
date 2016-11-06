import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ListController from '../src/react/pages/list/listController.jsx';

describe('listController 测试', function() {
    it('displayname is listController', function() {
        const lc = shallow(<listController />);
        expect(lc.displayname).to.equal('listController');
    });
});
