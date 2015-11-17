/**
 * Setting
 */
Security.defineMethod("sample_ifSetting", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['setting'], 'Sample');
    }
});

/**
 * Data Entry
 */
Security.defineMethod("sample_ifData", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data'], 'Sample');
    }
});

/**
 * Reporter
 */
Security.defineMethod("sample_ifReport", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['report'], 'Sample');
    }
});
