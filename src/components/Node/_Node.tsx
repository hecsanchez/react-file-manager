import {FC} from "react";
import {AssetNode, AssetNodeKind} from "../../types";
import {CheckIcon, DocumentIcon, EllipsisVerticalIcon, FolderIcon, MinusIcon} from "../Icons";

interface NodeProps {
    node: AssetNode;
    onDrag: () => void;
    onSelect: (id: number) => void;
    selected: boolean;
    childrenSelected: boolean;
}

export const Node: FC<NodeProps> = ({
    node,
    onDrag,
    onSelect,
    selected= false,
    childrenSelected = false
}) => {
    return (
        <div draggable onDrag={onDrag}>
            <div className="flex gap-2 cursor-move">
                <EllipsisVerticalIcon/>
                <EllipsisVerticalIcon/>
            </div>
            <div>
                <div className="rounded-md bg-gray-300 p-2" onClick={()=>onSelect(node.id)}>
                    {selected ? <CheckIcon/> : null}
                    {childrenSelected ? <MinusIcon /> : null}
                </div>
                <div>
                    {node.kind === AssetNodeKind.File ? <DocumentIcon/> : <FolderIcon/>}
                </div>
                <div>
                    {node.name}
                </div>
            </div>
        </div>
    )
}
