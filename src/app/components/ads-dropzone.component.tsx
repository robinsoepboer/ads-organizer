import * as React from 'react';
import { moveList } from '../actions';
import { DropTarget } from 'react-dnd';

const target = {
    drop(props, monitor) {
        const draggedObject = monitor.getItem();
        moveList(draggedObject.listId, props.insertedAfter);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

interface IProps {
    insertedAfter: number;
    connectDropTarget?: any;
    isOver?: boolean;
    canDrop?: boolean;
}

@DropTarget('AdsList', target, collect)
export class AdsDropZoneComponent extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return this.props.connectDropTarget(<div className={this.determineDropState()}></div>);
    }

    private determineDropState(): string {
        let classString = 'ads-dropzone';

        if (this.props.isOver)
            classString += ' isOver';
        if (this.props.canDrop)
            classString += ' canDrop';
        return classString;
    }
}
