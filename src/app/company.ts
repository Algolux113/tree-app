export class Company{
    id: number;
    name: string;
}

export class Group {
    id: number;
    name: string;
    companyId: number;
    parentGroupId: number;
}

export class Elem {
    id: number;
    name: string;
    groupId: number;
}