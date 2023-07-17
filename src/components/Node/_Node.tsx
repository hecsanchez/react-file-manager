import {Checkbox, FolderOpenedIcon} from "@/components";
import clsx from "clsx";
import {FC, MouseEvent} from "react";
import {AssetNode, AssetNodeKind} from "@/types";
import {DocumentIcon, EllipsisVerticalIcon, FolderIcon} from "@/components/Icons";

interface NodeProps {
    node: AssetNode;
    onDrag: () => void;
    onSelect: (node: AssetNode) => void;
    selected: boolean;
    indeterminate: boolean;
    onDoubleClick: (node: AssetNode) => void;
}

export const Node: FC<NodeProps> = ({
    node,
    onDrag,
    onSelect,
    onDoubleClick
}) => {
    const paddingLeft = (node.level ?? 0) * 24;

    const handleClick = (e: MouseEvent) => {
        if (e.detail === 2) {
            onDoubleClick?.(node)
        }
    }

    return (
        <>
            <div
                className="flex py-2 border-b border-b-gray-200"
                draggable onDrag={onDrag}
                onClick={handleClick}
            >
                <div className="flex cursor-move">
                    <EllipsisVerticalIcon className="text-gray-300" />
                    <EllipsisVerticalIcon className="-ml-4 text-gray-300"/>
                </div>
                <div className={clsx("flex gap-2")}
                     style={{
                         paddingLeft: paddingLeft
                     }}
                >
                    <Checkbox onChange={()=>onSelect(node)} checked={node.selected} indeterminate={node.indeterminate} />
                    <div>
                        {node.kind === AssetNodeKind.File ? <DocumentIcon/> : node.children?.length ? <FolderOpenedIcon/> : <FolderIcon/>}
                    </div>
                    <div>
                        {node.name}
                    </div>
                </div>
            </div>
        </>
    )
}
