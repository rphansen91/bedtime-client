import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { pluck } from 'rp-utils'

const title = s => pluck(s, 'user.displayName') || '';
const status = s => pluck(s, 'user.status') || '';
const avatar = s => pluck(s, 'user.photoURL') || process.env.PUBLIC_URL + '/library/imgs/pillow.png';

export default class Stream extends React.Component {
    componentDidMount () {
        const element = pluck(this.props, 'stream.mediaElement');
        element && this.refs.media.appendChild(element);
    }
    render () {
        const { stream } = this.props;
        return <div 
            className="connection-stream"
            ref="media"></div>
        {/*<Card className="connection-stream">
            <CardHeader 
                title={title(stream) }
                subtitle={status(stream)} 
                avatar={avatar(stream)}  >
            </CardHeader>
            <CardMedia>
                <div ref="media"></div>
            </CardMedia>
        </Card>*/}
    }
}