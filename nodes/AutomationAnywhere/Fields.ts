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
		displayName: 'Bot Runners',
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
		default: [0], // eslint-disable-line
	},
	{
		displayName: 'Number of Bot Runners to Use',
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		options: [
			{
				displayName: 'Bot Inputs',
				name: 'botInput',
				type: 'json',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				routing: {
					send: {
						property: 'botInput',
						type: 'body',
					},
				},
				default: '{\n   "myNumberVar":{\n      "type":"NUMBER",\n      "number":123\n   },\n   "myStringVar":{\n      "type":"STRING",\n      "string":"myValue"\n   },\n   "myBooleanVar":{\n      "type":"BOOLEAN",\n      "boolean":true\n   }\n}'
			},
			{
				displayName: 'Callback Url',
				name: 'callbackUrl',
				type: 'string',
				placeholder: 'https://callbackserver.com/storeBotExecutionStatus',
				routing: {
					send: {
						property: 'callbackInfo.url',
						type: 'body',
						value: '={{$value}}',
					},
				},
				default: '',
			},
			{
				displayName: 'Callback Headers',
				name: 'callbackInfo',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'values',
						displayName: 'Value',
						values: [
							{
								displayName: 'Field Name or ID',
								name: 'fieldId',
								type: 'string',
								required: true,
								default: '',
							},
							{
								displayName: 'Field Value',
								name: 'fieldValue',
								type: 'string',
								default: '',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=callbackInfo.headers.{{$parent.fieldId}}',
										type: 'body',
									},
								},
							},
						],
					},
				],
			},
			{
				displayName: 'Device Pools',
				name: 'poolIds',
				type: 'number',
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
				default: [], // eslint-disable-line
			},
			{
				displayName: 'Label',
				name: 'botLabel',
				type: 'string',
				description: 'Label for the bot being deployed',
				routing: {
					send: {
						property: 'botLabel',
						type: 'body',
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'automationName',
				type: 'string',
				placeholder: 'Deploy_My_Bot',
				routing: {
					send: {
						property: 'automationName',
						type: 'body',
					},
				},
				default: '',
			},
			{
				displayName: 'Override Default Device',
				name: 'overrideDefaultDevice',
				type: 'boolean',
				required: true,
				routing: {
					send: {
						property: 'overrideDefaultDevice',
						type: 'body',
					},
				},
				default: false,
			},
			{
				displayName: 'Priority',
				name: 'AutomationPriority',
				type: 'options',
				noDataExpression: true,
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
				displayName: 'Run with Administrative Privileges',
				name: 'runElevated',
				type: 'boolean',
				required: true,
				routing: {
					send: {
						property: 'runElevated',
						type: 'body',
					},
				},
				default: false,
			},
		],
	},
];

// archive, stop, Pause or Resume
const Manage: INodeProperties[] = [
	{
		displayName: 'Execution ID',
		name: 'executionID',
		description: 'ID of execution',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['archive', 'pause', 'resume', 'stop'],
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
	...Manage,
];
