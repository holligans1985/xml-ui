import React from "react";

export interface PublisherType {
    key?:React.Key,
    id:number,
    name: string,
    publisher: string,
    createdAt: string,
    editedAt: string
};

export interface CompanyType {
    key?:React.Key,
    id: number,
    company: string,
    cpc: number,
    updatedAt:string,
    type:string
};

export interface CampaingType {
    campaign:PublisherType,
    generic:CompanyType[],
    dynamic:CompanyType[]
}
