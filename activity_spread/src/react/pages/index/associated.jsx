import React from 'react';

class Associated extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Associated';
    }

    componentDidMount() {
        var myScroll = new IScroll('#wrapper', {});
        myScroll.on('scroll', function(){
            console.log('move123');
        });
    }

    render() {
        return (
            <div id="wrapper">
                <div id="scroller">
                    <ul>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Associated;
