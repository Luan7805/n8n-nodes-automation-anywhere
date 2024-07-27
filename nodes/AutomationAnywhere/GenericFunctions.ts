import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import {NodeApiError} from 'n8n-workflow';

export interface BodyWithPagination extends IDataObject {
	page: {
		length: number;
		offset: number;
	};
}

export async function aaApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: any = {},
	query?: IDataObject,
	uri?: string,
): Promise<any> {

	const options: IRequestOptions = {
		headers: {},
		method,
		qs: query,
		uri: uri || endpoint,
		body,
		json: true,
	};

	try {
		const credentials = await this.getCredentials('automationAnywhereApi');
		const baseUrl = credentials.url as string;
		options.uri = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${options.uri}`;
		return await this.helpers.requestWithAuthentication.call(this, 'automationAnywhereApi', options);

	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function aaApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	endpoint: string,
	body: BodyWithPagination = {page: {length: 10, offset: 0}},
	query: IDataObject = {},
): Promise<any> {

	const returnData: IDataObject[] = [];
	let responseData;

	do {
		responseData = await aaApiRequest.call(this, method, endpoint, body, query);
		const values = Object.values(responseData[propertyName] as IDataObject[]);
		returnData.push(...values);
		body.page.offset += body.page.length;

	} while (
		responseData.page.totalFilter !== undefined &&
		returnData.length - parseInt(responseData.page.totalFilter as string, 10) < 0
		);

	return returnData;
}
