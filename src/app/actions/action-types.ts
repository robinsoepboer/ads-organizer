enum ActionTypes {
    /* General */
    DataRetrievedFromStorage = 'SYSTEM.DATA_RETRIEVED_FROM_CHROME_STORAGE',

    /* List */
    ListCreate = 'LIST.CREATE',
    ListUpdate = 'LIST.UPDATE',
    ListDelete = 'LIST.DELETE',

    /* Add */
    AdCreate = 'AD.CREATE',
    AdUpdate = 'AD.UPDATE',
    AdDelete = 'AD.DELETE',
}

export default ActionTypes;
