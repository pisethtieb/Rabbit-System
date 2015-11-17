/**
 * Setting
 */
Security.defineMethod("rabbit_ifSetting", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['setting'], 'Rabbit');
    }
});

/**
 * Data Entry
 */
Security.defineMethod("rabbit_ifData", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data'], 'Rabbit');
    }
});

/**
 * Reporter
 */
Security.defineMethod("rabbit_ifReport", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['report'], 'Rabbit');
    }
});
