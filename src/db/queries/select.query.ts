import format from "pg-format";

export const selectQuery = (tableName: string, selectList?: string) => {
    return format(`SELECT %s from %I`, selectList || '*', tableName);
};

export const appendJoin = (tableName?: string, onStatement?: string) => (query: string) => {
    if (!tableName || !onStatement) {
        return query;
    }

    return `${query} JOIN ${tableName} ON ${onStatement}`;
};

export const appendFilters = (filters?: Record<string, string>) => (query: string) => {
    if (filters === undefined) {
        return query;
    }

    const conditions = Object.entries(filters).map(([key, value]) => format('%s = %L', key, value));

    return `${query} WHERE ${conditions.join(' AND ')}`;
};

export const appendLimit = (limit?: number) => (query: string) => {
    if (limit === undefined) {
        return query;
    }

    return `${query} ${format('LIMIT %L', limit)}`;
};

export const appendOffset = (offset?: number) => (query: string) => {
    if (offset === undefined) {
        return query;
    }

    return `${query} ${format('OFFSET %L', offset)}`;
};

export const appendOrderBy = (orderBy?: string) => (query: string) => {
    if (orderBy === undefined) {
        return query;
    }

    return `${query} ${format('ORDER BY %I', orderBy)}`;
};
