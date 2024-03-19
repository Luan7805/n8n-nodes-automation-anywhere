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
				name: 'Start',
				value: 'start',
				action: 'Start a new bot',
				routing: {
					request: {
						method: 'POST',
						url: '/v3/automations/deploy',
					},
				},
			},
			{
				name: 'Pause',
				value: 'pause',
				action: 'Pause an execution',
				routing: {
					request: {
						method: 'POST',
						url: '/v3/activity/manage',
					},
				},
			},
			{
				name: 'Resume',
				value: 'resume',
				action: 'Resume an execution',
				routing: {
					request: {
						method: 'POST',
						url: '/v3/activity/manage',
					},
				},
			},
			{
				name: 'Stop',
				value: 'stop',
				action: 'Stop an execution',
				routing: {
					request: {
						method: 'POST',
						url: '/v3/activity/manage',
					},
				},
			},
		],
		default: 'start',
	},
];
