import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { closestCenter, DragOverlay, DndContext, defaultDropAnimation, KeyboardSensor, MouseSensor, TouchSensor, useSensor, } from '@dnd-kit/core';
import { arrayMove, useSortable, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, } from '@dnd-kit/sortable';
//import { Item } from '../../components';
import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { Transform } from '@dnd-kit/utilities';
import Items from './Items';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';
import { inject, observer } from 'mobx-react'



const defaultDropAnimationConfig = Object.assign(Object.assign({}, defaultDropAnimation), { dragSourceOpacity: 0.5 });
const screenReaderInstructions = {
    draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};


const defaultInitializer = (index) => index;
function createRange(length, initializer = defaultInitializer) {
    return [...new Array(length)].map((_, index) => initializer(index));
}


const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        height: "calc(100vh - 220px)",
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


const Sortable = ({ setSelectId, deleteItemInPages, setComponentsData, items, store, changeDialogPageCreationData, adjustScale = false, collisionDetection = closestCenter, dropAnimation = defaultDropAnimationConfig, getItemStyles = () => ({}), handle = false, itemCount, isDisabled = () => false, removable, strategy = rectSortingStrategy, useDragOverlay = true, wrapperStyle = () => ({}), }) => {
    const classes = useStyles();
    console.log("Sortable render items", items)
    const [activeId, setActiveId] = useState(null);
    //const getIndex = items.indexOf.bind(items);
    const activeIndex = activeId ? activeId : -1;
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
            //setActiveId(null);
            //console.log("activeId", activeId)
            //console.log("over", over)
            //console.log("over", over.id)
            if (over) {
                //const overIndex = getIndex(over.id);
                if (activeId !== over.id) {
                    changeDialogPageCreationData("components", arrayMove(items, activeId, over.id));
                }
            }
            //console.log(items)
        }}
        onDragCancel={() => setActiveId(null)}
    >
        <SortableContext items={items} strategy={strategy}>
            <div className={classes.Container}>
                {items.map((value, index) => (
                    <SortableItem
                        setSelectId={setSelectId}
                        deleteItemInPages={deleteItemInPages}
                        setComponentsData={setComponentsData}
                        value={value}
                        key={index.toString()}
                        id={index.toString()}
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
                            setSelectId={setSelectId}
                            deleteItemInPages={deleteItemInPages}
                            setComponentsData={setComponentsData}
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
    </DndContext>)
}

export default Sortable

function SortableItem({
    disabled,
    id,
    index,
    handle,
    onRemove,
    style,
    useDragOverlay,
    wrapperStyle,
    value,
    setComponentsData,
    deleteItemInPages,
    setSelectId,
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
            setSelectId={setSelectId}
            deleteItemInPages={deleteItemInPages}
            setComponentsData={setComponentsData}
            ref={setNodeRef}
            value={value}
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

