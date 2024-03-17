import { INodeProperties } from 'n8n-workflow';

const manage: INodeProperties[] = [
	{
		displayName: 'Execution ID',
		name: 'executionID',
		description: 'ID of execution',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['pause', 'resume', 'stop'],
			},
		},
		routing: {
			send: {
				property: '={{$parameter.operation}}_executions',
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
