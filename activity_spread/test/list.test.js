import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import List from './list.jsx';

describe('list 测试', function() {
    before(function() {
        sinon.config = {
            userFakeTimers: false
        };
    });
    after(function() {
        sinon.config = {
            userFakeTimers: true
        };
    });
    it('初始state的page等于1', function() {
        let props = {};
        let res = {
            list: [
                {key1: '纪宁', key2: '13122221111'},
                {key1: '余薇', key2: '13522221111'}
            ]
        };
        props.getData = (p = {}, cb = () => {}) => {
            cb(res);
        };
        const list = shallow(<List {...props}/>);
        expect(list.find('ul')).to.equal(false);
    });
});