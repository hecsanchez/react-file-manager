import {AssetNodeDTO} from "../types";

export const getAssetNodes = async (siteId: number): Promise<Array<AssetNodeDTO>>  => {
    console.log('fetching')
    const response = await fetch(`/site/${siteId}/asset`);
    return await response.json() as AssetNodeDTO[];
}

export const createAssetNode = async(siteId: number, assetNodePayload: Partial<AssetNodeDTO>): Promise<AssetNodeDTO> => {
    const response = await fetch(`/site/${siteId}/asset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetNodePayload)
    })
    return await response.json() as AssetNodeDTO;
}

export const getAssetNodeChildren = async (siteId: number, nodeId: number): Promise<Array<AssetNodeDTO>> => {
    const response = await fetch(`/site/${siteId}/asset/${nodeId}`);
    return await response.json() as AssetNodeDTO[];
}

export const updateAssetNode = async (siteId: number, nodeId: number, assetNodePayload: Partial<AssetNodeDTO>): Promise<AssetNodeDTO> => {
    const response = await fetch(`/site/${siteId}/asset/${nodeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetNodePayload)
    })
    return await response.json() as AssetNodeDTO;
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
