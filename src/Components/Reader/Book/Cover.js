import React from 'react'
import { Cover } from './Styles';

const loadImg = src => new Promise((res, rej) => {
    var img = document.createElement('img');
    img.src = src;
    img.onload = res;
    img.onerror = rej;
})

export default class Item extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            active: false,
            loaded: false
        }
    }

    componentDidMount () {
        const { img } = this.props;
        
        loadImg(img)
        .then(() => this.setState({ loaded: true }))
        .catch(e => console.log("COULD NOT LOAD IMAGE", e));
    }

    render () {
        const { img, style } = this.props;
        const { loaded, active } = this.state;

        return (
            <Cover img={img} 
            style={style}
            loaded={loaded} 
            active={active}
            onMouseEnter={() => this.setState({ active: true })}
            onMouseLeave={() => this.setState({ active: false })}
            onTouchStart={() => this.setState({ active: true })}
            onTouchEnd={() => this.setState({ active: false })} />
        )
    }

}