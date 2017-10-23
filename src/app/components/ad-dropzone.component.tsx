import * as React from 'react';
import { } from '../actions';
import { DropTarget } from 'react-dnd';

const squareTarget = {
    drop(props, monitor) {
        // fire reorder action
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

@DropTarget('Ad', squareTarget, collect)
export class AdDropZoneComponent extends React.Component<{}, {}> {
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
