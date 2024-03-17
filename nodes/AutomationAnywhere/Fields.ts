import { INodeProperties } from 'n8n-workflow';

const manage: INodeProperties[] = [
	{
		displayName: 'Action',
		name: 'action',
		description: 'Pause, resume or stop an execution by specifying the execution ID',
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['manage'],
			},
		},
		type: 'options',
		noDataExpression: true,
		required: true,
		options: [
			{
				name: 'Pause',
				value: 'pause_executions',
			},
			{
				name: 'Resume',
				value: 'resume_executions',
			},
			{
				name: 'Stop',
				value: 'stop_executions',
			},
		],
		default: '',
	},

	{
		displayName: 'Execution ID',
		name: 'executionID',
		description: 'ID of execution',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['manage'],
			},
		},
		routing: {
			send: {
				property: '={{$parameter.action}}',
				type: 'body',
				value: '={{ {"execution_ids": [$value]} }}',
			},
		},
		default: '',
	},
];

export const Fields: INodeProperties[] = [
	...manage,
];
