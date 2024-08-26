const capitalize = (string: string) => {
    if (string.length === 0) {
        return '';
    }

    return `${string[0].toUpperCase()}${string.slice(1)}`;
}

const snakeToCamel = (string: string) => {
    const [start, ...rest] = string.split("_");

    return `${start}${rest.map(capitalize).join("")}`;
}

export const mapKeysToCamelCase = (object: Object) => {
    const newObject = Object.create(null);

    Object.entries(object).forEach(([key, value ]) => {
       newObject[snakeToCamel(key)] = value;
    });

    return newObject;
}
