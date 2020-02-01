export const updateObject = (oldObject, updatedProperties) => {
    console.log('Updating state : ', oldObject, updatedProperties);
    return {
        ...oldObject,
        ...updatedProperties,
     } ;
};
