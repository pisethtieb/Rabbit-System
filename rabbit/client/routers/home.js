rabbitRoutes.route('/home', {
    name: 'rabbit.home',
    action: function (params, queryParams) {
        Layout.main('rabbit_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home'
        //parent: 'Home'
    }
});
