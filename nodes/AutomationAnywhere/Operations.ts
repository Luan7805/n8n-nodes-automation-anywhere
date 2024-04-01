import {IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties} from 'n8n-workflow';

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
				name: 'Archive',
				value: 'archive',
				action: 'Archive an queue execution',
				routing: {
					request: {
						method: 'PUT',
						url: '/v1/activity/auditunknown',
						headers: {
							Accept: 'text/json',
							'Content-Type': 'text/plain',
						},
					},
					send: {
						preSend: [
							async function (
								this: IExecuteSingleFunctions,
								requestOptions: IHttpRequestOptions,
							): Promise<IHttpRequestOptions> {
								requestOptions.body = '"' + this.getNodeParameter('executionID') + '"';
								return requestOptions;
							},
						],
					},
				},
			},
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
				name: 'Get',
				value: 'get',
				action: 'Gets job execution',
				routing: {
					request: {
						method: 'GET',
						url: '=/v3/activity/execution/{{$parameter.executionID}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many job executions',
				routing: {
					request: {
						method: 'POST',
						url: '/v3/activity/list',
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
