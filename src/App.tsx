import {useEffect, useState} from "react";
import {NodeList} from "./components/NodeList";
import {getAssetNodeChildren, getAssetNodes} from "./services/assetNode.ts";
import {AssetNode} from "./types";
import {Button, PlusIcon, Select} from "@/components";

const siteId = 1;

function App() {
    const [nodes, setNodes] = useState<Array<AssetNode>>([])

    const buildTree = (nodes: Array<AssetNode>, parentId: number|null = null, level = 0): Array<AssetNode> => {
        return nodes
            .filter(node => node.parent_id === parentId)
            .map(node => ({
                ...node,
                level,
                children: buildTree(nodes, node.id, level + 1)
            }));
    }

    const handleDoubleClick = async (node: AssetNode) => {
        if (nodes.some(existingNode=> existingNode.parent_id === node.id)) return

        const response = await getAssetNodeChildren(siteId, node.id)
        setNodes(prevState=> {
            let newNodes = response;
            if (node.selected) {
                newNodes = response.map(node => ({...node, selected: true}))
            }
            return [...prevState, ...newNodes]
        })
    }


    useEffect(()=>{
       const getNodes = async() => {
            try {
                const response = await getAssetNodes(siteId);
                setNodes(response);
            } catch(e) {

            }
        }
        getNodes();
    }, [])

    const handleSelect = (node: AssetNode): void => {
        const isNodeSelected = node.selected;

        const deselectNode = (prevState: AssetNode[]): AssetNode[] => {
            node.selected = false;
            return prevState.map(prevNode => {
                if (prevNode.id === node.parent_id) {
                    return {
                        ...prevNode,
                        indeterminate: isParentIndeterminate(node),
                        selected: isParentSelected(node)
                    }
                } else if (prevNode.id === node.id) {
                    return {
                        ...prevNode,
                        ...node,
                    }
                } else if (prevNode.parent_id === node.id) {
                    return {
                        ...prevNode,
                        selected: false,
                    }
                }

                return prevNode;
            });
        }

        const selectNode = (prevState: AssetNode[]): AssetNode[] => {
            node.selected = true;
            return prevState.map(prevNode => {
                if (prevNode.id === node.parent_id) {
                    return {
                        ...prevNode,
                        indeterminate: isParentIndeterminate(node),
                        selected: isParentSelected(node)
                    }
                } else if (prevNode.id === node.id) {
                    return {
                        ...prevNode,
                        ...node,
                        indeterminate: false,
                    }
                } else if (prevNode.parent_id === node.id) {
                    return {
                        ...prevNode,
                        selected: true,
                    }
                }

                return prevNode;
            });
        }


        if (isNodeSelected) {
            console.log("node selected")
            setNodes(deselectNode);
        } else {
            console.log("node NOT selected")

            setNodes(selectNode);
        }
    }

    console.log('nodes', nodes)

    const isParentIndeterminate = (node: AssetNode): boolean => {
        const children = nodes.filter(child => child.parent_id === node.parent_id);
        const selectedChildren = children.filter(child => {
            if (child.id === node.id) return node.selected;
            return child.selected
        });

        if (selectedChildren.length === children.length) return false;

        return selectedChildren.length > 0 && selectedChildren.length < children.length;
    };

    const isParentSelected = (node: AssetNode): boolean => {
        const children = nodes.filter(child => child.parent_id === node.parent_id);
        const selectedChildren = children.filter(child => {
            if (child.id === node.id) return node.selected;
            return child.selected
        });
        if (selectedChildren.length === children.length) return true;
    }

  return (
    <div className="max-w-4xl m-auto my-12">
        <div className="mb-8 flex justify-between">
            <Select />
            <Button>
                <PlusIcon className="mr-1" />
                Add New
            </Button>
        </div>
        <NodeList
          nodes={buildTree(nodes)}
          onDoubleClick={handleDoubleClick}
          onSelect={handleSelect}
        />
    </div>
  )
}

export default App
