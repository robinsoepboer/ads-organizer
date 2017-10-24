import * as React from 'react';
import { DragSource } from 'react-dnd';

interface IProps {
    adId: number;
    listId: number;
    connectDragSource?: any;
    isDragging?: boolean;
}

const adSource = {
    beginDrag(props) {
        return {
            adId: props.adId,
            listId: props.listId,
        };
    },
};

@DragSource('Ad', adSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export class AdDraggableZoneComponent extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return this.props.connectDragSource(
            <div className="ad" style={{opacity: this.props.isDragging ? 0.5 : 1}}>
                {this.props.children}
            </div>,
        );
    }
}
