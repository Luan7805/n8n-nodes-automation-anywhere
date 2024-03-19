import type {
	CredentialInformation,
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class AutomationAnywhereApi implements ICredentialType {
	name = 'automationAnywhereApi';

	displayName = 'Automation Anywhere API';

	properties: INodeProperties[] = [
		{
			displayName: 'Session Token',
			name: 'sessionToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Control room URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://name.my.automationanywhere.digital',
		},
		{
			displayName: 'Type of auth',
			name: 'authType',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Username/Token',
					value: 'apiKey',
				},
				{
					name: 'Username/Password',
					value: 'password',
				}
			],
			default: 'apiKey',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Token or Password',
			name: 'authSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	// method will only be called if "sessionToken" (the expirable property)
	// is empty or is expired
	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const url = credentials.url as string;
		const authType = credentials.authType as string;
		const requestBody: Record<string, CredentialInformation> = {
			'username': credentials.username,
			[authType]: credentials.authSecret
		};

		const { token } = (await this.helpers.httpRequest({
			method: 'POST',
			url: `${url.endsWith('/') ? url.slice(0, -1) : url}/v2/authentication`,
			body: requestBody,
		})) as { token: string };
		return { sessionToken: token };
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Authorization': '={{$credentials.sessionToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
			method: "POST",
			url: '/v2/authentication/token',
		},
	};
}
