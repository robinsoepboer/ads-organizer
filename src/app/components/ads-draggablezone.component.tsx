import * as React from 'react';
import { moveList } from '../actions';
import { DragSource } from 'react-dnd';

interface IState {
    editable: boolean;
    title: string;
}

interface IProps {
    adsListId: number;
    connectDragSource?: any;
    isDragging?: boolean;
}

const adSource = {
    beginDrag(props) {
        return {
            listId: props.adsListId,
        };
    },
};

@DragSource('AdsList', adSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export class AdsDraggableZoneComponent extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return this.props.connectDragSource(
            <div className="ads-list" style={{opacity: this.props.isDragging ? 0.5 : 1}}>
                {this.props.children}
            </div>,
        );
    }
}
