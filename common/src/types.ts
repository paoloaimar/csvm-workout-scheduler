import { FilterDataType, FilterOperator, FilterPredicate, HttpStatusCode, SortOrder } from "./enum"

export type HttpResponse = {
    success: boolean,
    code: HttpStatusCode,
    data?: any | undefined,
    error?: string | undefined,
    url?: string | undefined
}

export type Filter = {
    filters: EntityFilter[];
    operator: FilterOperator;
};
export type EntityFilter = {
    table: string;
    field: string;
    predicate: FilterPredicate;
    value: string;
    dataType: FilterDataType;
    caseSensitive?: boolean;
};
export type EntitySort = {
    table: string;
    field: string;
    order: SortOrder;
};
export type EntityPagination = {
    resultPerPage: number;
    page: number;
    totalPageCount?: number;
};
export type PaginationInfo = {
    recordCount: number;
    pageCount: number;
};

export type UserStatus = {
    PkId: number,
    Code: string,
    Description?: string,
    CreatedAt: Date,
    UpdatedAt?: Date
}

export type User = {
    PkId: number,
    StatusPkId: number,
    FirstName?: string,
    LastName?: string,
    LoginName: string,
    CreatedAt: Date,
    UpdatedAt?: Date,

    Status: UserStatus
    Roles?: Role[]
}

export type Role = {
    PkId: number,
    Level: number,
    Code: string,
    Description?: string,
    CreatedAt: Date,
    UpdatedAt?: Date,

    Authorizations?: Authorization[]
}

export type Authorization = {
    PkId: number,
    Code: string,
    Description?: string,
    CreatedAt: Date,
    UpdatedAt?: Date
}

export type CredentialStatus = {
    PkId: number,
    Code: string,
    Description?: string,
    CreatedAt: Date,
    UpdatedAt?: Date
}

export type Credential = {
    PkId: number,
    StatusPkId: number,
    UserPkId: number,
    Username: string,
    Email: string,
    HashPwd: string,
    VerificationCode: string
    CreatedAt: Date,
    UpdatedAt?: Date,

    User: User
}