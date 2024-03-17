import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import {Operations} from "./Operations";
import {Fields} from "./Fields";


export class AutomationAnywhere implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Automation Anywhere',
		name: 'AutomationAnywhere',
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
				name: 'AutomationAnywhere',
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
					},
				],
				default: 'ExecutionOrchestrator',
			},

			...Operations,
			...Fields,
		],
	};
}
