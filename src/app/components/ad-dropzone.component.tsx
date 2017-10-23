import * as React from 'react';
import { moveAd } from '../actions';
import { DropTarget } from 'react-dnd';

const squareTarget = {
    drop(props, monitor) {
        const draggedObject = monitor.getItem();
        moveAd(draggedObject.adId, draggedObject.listId, props.insertedAfterAdd, props.insertedInList);
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
    insertedAfterAdd: number;
    insertedInList: number;
}

@DropTarget('Ad', squareTarget, collect)
export class AdDropZoneComponent extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return (this.props as any).connectDropTarget(
            <div className={this.determineDropState()}></div>);
    }

    private determineDropState(): string {
        const anyProps = (this.props as any);
        let classString = 'ad-dropzone';

        if (anyProps.isOver)
            classString += ' isOver';
        if (anyProps.canDrop)
            classString += ' canDrop';
        return classString;
    }
}
