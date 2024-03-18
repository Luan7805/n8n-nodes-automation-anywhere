import { INodeProperties } from 'n8n-workflow';

const Start: INodeProperties[] = [
	{
		displayName: 'Bot ID',
		name: 'fileId',
		description: 'ID of the bot you want to start',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'fileId',
				type: 'body',
			},
		},
		default: '',
	},
	{
		displayName: 'Bot runners',
		name: 'runAsUserIds',
		description: 'ID of Bot runners users',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add User',
		},
		routing: {
			send: {
				property: 'runAsUserIds',
				type: 'body',
			},
		},
		default: [0]
	},
	{
		displayName: 'Device pools',
		name: 'poolIds',
		type: 'number',
		required: false,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Pool',
		},
		routing: {
			send: {
				property: 'poolIds',
				type: 'body',
			},
		},
		default: [],
	},
	{
		displayName: 'Automation priority',
		name: 'AutomationPriority',
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		type: 'options',
		noDataExpression: true,
		required: true,
		options: [
			{
				name: 'High',
				value: 'PRIORITY_HIGH',
			},
			{
				name: 'Medium',
				value: 'PRIORITY_MEDIUM',
			},
			{
				name: 'Low',
				value: 'PRIORITY_LOW',
			},
		],
		routing: {
			send: {
				property: 'AutomationPriority',
				type: 'body',
			},
		},
		default: 'PRIORITY_MEDIUM',
	},
	{
		displayName: 'Callback',
		name: 'Callback',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		default: false,
	},
	{
		displayName: 'Callback URL',
		name: 'callbackInfo',
		placeholder: 'https://callbackserver.com/storeBotExecutionStatus',
		type: 'string',
		required: false,
		displayOptions: {
			hide: {
				Callback: [false]
			},
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'callbackInfo',
				type: 'body',
				value: '={{ {"url": $value} }}',
			},
		},
		default: ''
	},
	{
		displayName: 'Number of bot runners to use',
		name: 'numOfRunAsUsersToUse',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'numOfRunAsUsersToUse',
				type: 'body',
			},
		},
		default: 1,
	},
	{
		displayName: 'Override Default Device',
		name: 'overrideDefaultDevice',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'overrideDefaultDevice',
				type: 'body',
			},
		},
		default: false,
	},
	{
		displayName: 'Run with administrative privileges',
		name: 'runElevated',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		routing: {
			send: {
				property: 'runElevated',
				type: 'body',
			},
		},
		default: false,
	},
];

// Stop, Pause or Resume
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
	...Start,
	...manage,
];
