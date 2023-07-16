import {AssetNode} from "../types";

export const getAssetNodes = async (siteId: number): Promise<Array<AssetNode>>  => {
    console.log('fetching')
    const response = await fetch(`/site/${siteId}/asset`);
    return response.json();
}

export const createAssetNode = async(siteId: number, assetNodePayload: Partial<AssetNode>): Promise<AssetNode> => {
    const response = await fetch(`/site/${siteId}/asset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetNodePayload)
    })
    return response.json();
}

export const getAssetNodeChildren = async (siteId: number, nodeId: number): Promise<Array<AssetNode>> => {
    const response = await fetch(`/site/${siteId}/asset/${nodeId}`);
    return response.json();
}

export const updateAssetNode = async (siteId: number, nodeId: number, assetNodePayload: Partial<AssetNode>): Promise<AssetNode> => {
    const response = await fetch(`/site/${siteId}/asset/${nodeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetNodePayload)
    })
    return response.json();
}

export const deleteAssetNodes = async(siteId: number, nodeIds: Array<number>) => {
    const response = await fetch(`/site/${siteId}/asset/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nodeIds)
    });
    return response.json();
}
