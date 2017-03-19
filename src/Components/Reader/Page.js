import React from 'react';
import { pluck } from 'rp-utils';

export default class Page extends React.Component {
    getViewport () {
        const height = pluck(this.refs, 'page.clientHeight');
        const { page, scale } = this.props;
        const vpt = page.getViewport(1);
        
        if (!height) return vpt;

        return page.getViewport((height * (scale || 1)) / vpt.height);
    }
    componentDidMount () {
        this.renderCanvas()
    }
    renderCanvas () {
        const { page } = this.props;
        const canvas = this.refs.canvas;
        const vpt = this.getViewport();
        const ctx = canvas.getContext('2d');
        canvas.height = vpt.height;
        canvas.width = vpt.width;
        page && page.render({
            canvasContext: ctx,
            viewport: vpt
        });
    }
    pageClass () {
        const { current, index } = this.props;
        if (current < index) return 'hide right';
        if (current > index) return 'hide left';
        return 'show'
    }
    render () {
        const { active } = this.props;
        return <div className={'page ' + this.pageClass()} ref='page'>
            <canvas ref='canvas' />
        </div>
    }
}