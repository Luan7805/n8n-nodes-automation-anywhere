import { INodeProperties } from 'n8n-workflow';

export const Operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
			},
		},
		options: [
			{
				name: 'Manage',
				value: 'manage',
				action: 'Stop, Pause, or Resume an execution',
				routing: {
					request: {
						method: 'POST',
						url: '/v3/activity/manage',
					},
				},
			},
		],
		default: '',
	},
];
