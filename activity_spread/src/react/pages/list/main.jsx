import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'List';
    }
    componentDidMount() {
        var myScroll = new IScroll('#wrapper', {
            scrollbars: true
        });
        myScroll.on('scroll', function(){
            console.log('move123');
        });
    }
    render() {
        return (
            <div className="section-page section-page-4">
                <div id="wrapper" className="list-w">
                    <ul>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                        <li><span className="mobile">13211112222</span><span className="time">2016.10.8</span></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default List;
