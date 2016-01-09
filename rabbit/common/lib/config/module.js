// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Rabbit = {
    name: 'Rabbit System',
    version: '0.0.1',
    summary: 'Rabbit Management System is ...',
    roles: [
        'setting',
        'data',
        'report'
    ],
    dump: {
        setting: [
            'rabbit_location'
        ],
        data: [
            'rabbit_customer',
            'rabbit_order'
        ]
    }
};
