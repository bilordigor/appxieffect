import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { closestCenter, DragOverlay, DndContext, defaultDropAnimation, KeyboardSensor, MouseSensor, TouchSensor, useSensor, } from '@dnd-kit/core';
import { arrayMove, useSortable, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, } from '@dnd-kit/sortable';
//import { Item } from '../../components';
import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { Transform } from '@dnd-kit/utilities';
import { Items } from './Items';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

const defaultDropAnimationConfig = Object.assign(Object.assign({}, defaultDropAnimation), { dragSourceOpacity: 0.5 });
const screenReaderInstructions = {
    draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};


















function Wrapper({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}







const defaultInitializer = (index) => index;
function createRange(length, initializer = defaultInitializer) {
    return [...new Array(length)].map((_, index) => initializer(index));
}




const useStyles = makeStyles((theme) => ({
    Container: {
        height: "calc(100vh - 138px)",
        display: "block",
        overflow: "auto",
        '&::-webkit-scrollbar': {
            width: "0! important",
            height: 0,
            display: "none !important",
            background: "transparent",
        }
    },
}));




export default function Sortable({ adjustScale = false, collisionDetection = closestCenter, dropAnimation = defaultDropAnimationConfig, getItemStyles = () => ({}), handle = false, itemCount = 16, items: initialItems, isDisabled = () => false, removable, strategy = rectSortingStrategy, useDragOverlay = true, wrapperStyle = () => ({}), }) {
    const classes = useStyles();


    const [items, setItems] = useState(() => initialItems !== null && initialItems !== void 0 ? initialItems : createRange(itemCount, (index) => (index + 1).toString()));
    const [activeId, setActiveId] = useState(null);
    const getIndex = items.indexOf.bind(items);
    const getPosition = (id) => getIndex(id) + 1;
    const activeIndex = activeId ? getIndex(activeId) : -1;
    const handleRemove = removable
        ? (id) => setItems((items) => items.filter((item) => item !== id))
        : undefined;

    return (<DndContext
        screenReaderInstructions={screenReaderInstructions}
        collisionDetection={collisionDetection}
        onDragStart={({ active }) => {
            if (!active) {
                return;
            }

            setActiveId(active.id);
        }}
        onDragEnd={({ over }) => {
            setActiveId(null);
            console.log("over", over)
            if (over) {
                const overIndex = getIndex(over.id);
                if (activeIndex !== overIndex) {
                    setItems((items) => arrayMove(items, activeIndex, overIndex));
                }
            }
            console.log(items)
        }}
        onDragCancel={() => setActiveId(null)}
    >
        <SortableContext items={items} strategy={strategy}>
            <div className={classes.Container}>
                {items.map((value, index) => (
                    <SortableItem
                        key={value}
                        id={value}
                        handle={handle}
                        index={index}
                        // style={getItemStyles}
                        // wrapperStyle={wrapperStyle}
                        disabled={isDisabled(value)}
                        onRemove={handleRemove}
                        useDragOverlay={useDragOverlay}
                    />
                ))}
            </div>
        </SortableContext>
        {useDragOverlay
            ? createPortal(
                <DragOverlay
                    adjustScale={adjustScale}
                    dropAnimation={dropAnimation}
                >
                    {activeId ? (
                        <Items
                            value={items[activeIndex]}
                            handle={handle}
                            wrapperStyle={wrapperStyle({
                                index: activeIndex,
                                isDragging: true,
                                id: items[activeIndex],
                            })}
                            style={getItemStyles({
                                id: items[activeIndex],
                                index: activeIndex,
                                isSorting: activeId !== null,
                                isDragging: true,
                                overIndex: -1,
                                isDragOverlay: true,
                            })}
                            dragOverlay
                        />
                    ) : null}
                </DragOverlay>,
                document.body
            )
            : null}
    </DndContext>);
}

export function SortableItem({
    disabled,
    id,
    index,
    handle,
    onRemove,
    style,
    useDragOverlay,
    wrapperStyle,
}) {
    const {
        attributes,
        isDragging,
        isSorting,
        listeners,
        overIndex,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        disabled,
    });

    return (
        <Items
            ref={setNodeRef}
            value={id}
            disabled={disabled}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            index={index}
            // style={style({
            //     index,
            //     id,
            //     isDragging,
            //     isSorting,
            //     overIndex,
            // })}
            onRemove={onRemove ? () => onRemove(id) : undefined}
            transform={transform}
            transition={!useDragOverlay && isDragging ? 'none' : transition}
            listeners={listeners}
            data-index={index}
            data-id={id}
            dragOverlay={!useDragOverlay && isDragging}
            {...attributes}
        />
    );
}