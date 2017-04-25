import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { pluck, flow } from 'rp-utils';
import { refreshVideos } from '../../utils/native';

const title = s => pluck(s, 'user.displayName') || '';
const status = s => pluck(s, 'user.status') || '';
const avatar = s => pluck(s, 'user.photoURL') || process.env.PUBLIC_URL + '/library/imgs/pillow.png';

export default class Stream extends React.Component {
    constructor (props) {
        super(props);
        this.componentDidMount = refreshVideos;
        this.componentWillReceiveProps = refreshVideos;
        this.componentDidUpdate = refreshVideos;
    }
    render () {
        const { stream, style, layer } = this.props;
        return <div style={style || {}} 
            className="connection-stream"
            ref="media">
                <video style={{zIndex: layer}} 
                src={stream.blobURL} />
            </div>
        {/*return <Card className="connection-stream">
            <CardHeader 
                title={title(stream) }
                subtitle={status(stream)} 
                avatar={avatar(stream)}>
            </CardHeader>
            <CardMedia>
                <div ref="media"></div>
            </CardMedia>
        </Card>*/}
    }
}