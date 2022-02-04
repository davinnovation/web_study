import { ImageMeta } from "types/item";
import { useVirtual } from "react-virtual";
import React from "react";

interface TableOption {
    height: number,
    widht: number
}

function RowVirtualizerFixed() {
    const parentRef = React.useRef()

    const rowVirtualizer = useVirtual({
        size: 10000,
        parentRef,
        estimateSize: React.useCallback(() => 35, []),
        overscan: 5,
    })

    return (
        <>
            <div
                ref={parentRef}
                className="List"
                style={{
                    height: `200px`,
                    width: `400px`,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.totalSize}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.virtualItems.map(virtualRow => (
                        <div
                            key={virtualRow.index}
                            className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            Row {virtualRow.index}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function ClsImageTable(tableOption: TableOption, tableData: ImageMeta[]) {
    return (
        <RowVirtualizerFixed />
    )
}

export default ClsImageTable;