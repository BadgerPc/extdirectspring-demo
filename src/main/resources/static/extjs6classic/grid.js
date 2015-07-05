Ext.require([ 'Ext.direct.*', 'Ext.data.*', 'Ext.grid.*', 'Ext.util.Format' ]);

Ext.define('Company', {
	extend: 'Ext.data.Model',
	fields: [ 'name', 'turnover' ]
});

Ext.onReady(function() {
	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

	// create the Tree
	Ext.create('Ext.grid.Panel', {
		store: {
			model: 'Company',
			remoteSort: true,
			autoLoad: true,
			sorters: [ {
				property: 'name',
				direction: 'ASC'
			}, {
				property: 'turnover',
				direction: 'DESC'
			} ],
			proxy: {
				type: 'direct',
				directFn: turnoverService.getTurnovers
			}
		},
		columns: [ {
			dataIndex: 'name',
			flex: 1,
			text: 'Name'
		}, {
			dataIndex: 'turnover',
			align: 'right',
			width: 200,
			text: 'Turnover pa.',
			renderer: Ext.util.Format.usMoney
		} ],
		height: 350,
		width: 600,
		title: 'Company Grid',
		renderTo: Ext.getBody()
	});
});