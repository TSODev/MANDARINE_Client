export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
     } ;
};

export const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);
