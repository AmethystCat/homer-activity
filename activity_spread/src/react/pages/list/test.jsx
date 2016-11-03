import React from 'react';
import Test2 from './test2';

const a = () => {console.log(123);};

const Test = () => <div><Test2/><button type="button" onClick={a}>测试测试啊</button></div>;

export default Test;