import axios, { AxiosInstance } from "axios";

export class ApiClient {

    private readonly client: AxiosInstance;

    constructor(baseUrl: string) {

        this.client = axios.create({

            baseURL: baseUrl,

            timeout: 10000,

            headers: {

                "Content-Type": "application/json"

            }

        });

    }

    public async get<T>(
        url: string
    ): Promise<T> {

        const response = await this.client.get<T>(url);

        return response.data;

    }

    public async post<T>(
        url: string,
        body: unknown
    ): Promise<T> {

        const response = await this.client.post<T>(
            url,
            body
        );

        return response.data;

    }

}