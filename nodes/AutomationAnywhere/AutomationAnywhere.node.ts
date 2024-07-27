import {
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import type {BodyWithPagination} from "./GenericFunctions";
import {Operations} from "./Operations";
import {Fields} from "./Fields";
import {aaApiRequestAllItems} from "./GenericFunctions";


export class AutomationAnywhere implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Automation Anywhere',
		name: 'automationAnywhere',
		icon: 'file:AutomationAnywhere.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Automation Anywhere API',
		defaults: {
			name: 'AutomationAnywhere',
		},
		inputs: ['main'],
		outputs: ['main'],

		credentials: [
			{
				name: 'automationAnywhereApi',
				required: true,
			},
		],

		requestDefaults: {
			baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Execution Orchestrator',
						value: 'ExecutionOrchestrator',
						description: 'List, Start, Stop, Pause or Resume an execution'
					},
				],
				default: 'ExecutionOrchestrator',
			},

			...Operations,
			...Fields,
		],
	};

	methods = {
		loadOptions: {
			async getRunners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const body: BodyWithPagination = {
					sort: [{field: 'username', direction: 'asc'}],
					page: {length: 10, offset: 0}
				};
				const responseData = await aaApiRequestAllItems.call(
					this,
					'list',
					'POST',
					'/v1/devices/runasusers/list',
					body
				);

				const users = responseData as [{ id: number; username: string }];
				return users.map((user) => {
					const name = user.username;
					const value = user.id;
					return {name, value};
				});
			},
		}
	};
}
