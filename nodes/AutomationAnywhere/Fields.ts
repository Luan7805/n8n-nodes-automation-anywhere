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
				property: 'botId',
				type: 'body',
			},
		},
		default: '',
	},
	{
		displayName: 'Bot Runners IDs',
		name: 'runAsUserIds',
		description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getRunners',
		},
		routing: {
			send: {
				property: 'unattendedRequest.runAsUserIds',
				type: 'body',
			},
		},
		default: [], // eslint-disable-line
	},
	{
		displayName: 'Device Configuration',
		name: 'deviceUsageType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['start'],
			},
		},
		options: [
			{
				name: 'Prefer Default Device',
				value: 'PREFER_DEFAULT_DEVICE',
			},
			{
				name: 'Run Only on Default Device',
				value: 'RUN_ONLY_ON_DEFAULT_DEVICE',
			},
			{
				name: 'Run on Pool Device',
				value: 'RUN_ON_POOL_DEVICES',
			},
		],
		routing: {
			send: {
				property: 'unattendedRequest.deviceUsageType',
				type: 'body',
			},
		},
		default: 'PREFER_DEFAULT_DEVICE',
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
								displayName: 'varName',
								name: 'varName',
								type: 'string',
								required: true,
								default: '',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'String',
										value: 'STRING',
									},
									{
										name: 'Number',
										value: 'NUMBER',
									},
									{
										name: 'Boolean',
										value: 'BOOLEAN',
									},
								],
								default: '',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=botInput.{{$parent.varName}}.type',
										type: 'body',
									},
								},
							},
							{
								displayName: 'Value',
								name: 'valueString',
								type: 'string',
								default: '',
								routing: {
									send: {
										value: '={{$value}}',
										property: '=botInput.{{$parent.varName}}.{{$parent.type.toLowerCase()}}',
										type: 'body',
									},
								},
							},
						],
					},
				],
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
				displayName: 'Device Pools IDs',
				name: 'poolIds',
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getPools',
				},
				routing: {
					send: {
						property: 'unattendedRequest.poolIds',
						type: 'body',
					},
				},
				default: [], // eslint-disable-line
			},
			{
				displayName: 'Hide Bot Run Window',
				name: 'hideBotAgentUi',
				type: 'boolean',
				required: true,
				routing: {
					send: {
						property: 'hideBotAgentUi',
						type: 'body',
					},
				},
				default: true,
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
				displayName: 'Number of Bot Runners to Use',
				name: 'numOfRunAsUsersToUse',
				type: 'number',
				required: true,
				routing: {
					send: {
						property: 'unattendedRequest.numOfRunAsUsersToUse',
						type: 'body',
					},
				},
				default: 1,
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
						property: 'automationPriority',
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

const GetMany: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Conditions',
				name: 'conditions',
				values: [
					{
						displayName: 'Condition Type',
						name: 'operator',
						type: 'options',
						routing: {
							send: {
								property: 'filter.operator',
								type: 'body',
							}
						},
						options: [
							{
								name: 'Equals',
								value: 'eq',
							},
							{
								name: 'Greater',
								value: 'gt',
							},
							{
								name: 'Greater or Equal',
								value: 'ge',
							},
							{
								name: 'Less',
								value: 'lt',
							},
							{
								name: 'Less or Equal',
								value: 'le',
							},
							{
								name: 'Not Equal',
								value: 'ne',
							},
						],
						default: 'eq',
					},
					{
						displayName: 'Field',
						name: 'field',
						description: 'Any searchable field',
						type: 'string',
						routing: {
							send: {
								property: 'filter.field',
								type: 'body',
							}
						},
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						routing: {
							send: {
								property: 'filter.value',
								type: 'body',
							}
						},
						default: '',
					},
				],
			},
		],
		default: {},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		description: 'Max number of results to return',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['getMany'],
			},
		},
		routing: {
			send: {
				property: 'page.length',
				type: 'body',
			},
		},
		default: 50,
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['ExecutionOrchestrator'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true
				},
				placeholder: 'Add Sort',
				options: [
					{
						displayName: 'Sort',
						name: 'sort',
						values: [
							{
								displayName: 'Direction',
								name: 'direction',
								description: 'The sorting direction',
								type: 'options',
								options: [
									{
										name: 'Ascending',
										value: 'ASC',
									},
									{
										name: 'Descending',
										value: 'DESC',
									},
								],
								routing: {
									send: {
										property: '=sort.[{{$index}}].direction',
										type: 'body',
									}
								},
								default: 'ASC',
							},
							{
								displayName: 'Field',
								name: 'field',
								description: 'The sorting field',
								type: 'string',
								required: true,
								routing: {
									send: {
										property: '=sort.[{{$index}}].field',
										type: 'body',
									}
								},
								default: '',
							},
						],
					},
				],
				default: {},
			},
		],
		default: {},
	},
];

// Archive, Get, Stop, Pause or Resume
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
				operation: ['archive', 'get', 'pause', 'resume', 'stop'],
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
	...GetMany,
	...Manage,
];
