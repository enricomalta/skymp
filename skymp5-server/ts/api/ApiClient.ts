import axios, {
    AxiosInstance,
    AxiosRequestConfig
} from "axios";

export class ApiClient {

    private readonly client: AxiosInstance;

    private token?: string;

    constructor(baseUrl: string) {

        this.client = axios.create({

            baseURL: baseUrl,

            timeout: 10000,

            headers: {

                "Content-Type": "application/json"

            }

        });

    }

    public setToken(
        token: string
    ): void {

        this.token = token;

    }

    private createConfig(): AxiosRequestConfig {

        if (!this.token) {

            return {};

        }

        return {

            headers: {

                Authorization: `Bearer ${this.token}`

            }

        };

    }

    public async get<T>(
        url: string
    ): Promise<T> {

        const response =
            await this.client.get<T>(
                url,
                this.createConfig()
            );

        return response.data;

    }

    public async post<T>(
        url: string,
        body: unknown
    ): Promise<T> {

        const response =
            await this.client.post<T>(
                url,
                body,
                this.createConfig()
            );

        return response.data;

    }

    public async put<T>(
        url: string,
        body: unknown
    ): Promise<T> {

        const response =
            await this.client.put<T>(
                url,
                body,
                this.createConfig()
            );

        return response.data;

    }

    public async delete<T>(
        url: string
    ): Promise<T> {

        const response =
            await this.client.delete<T>(
                url,
                this.createConfig()
            );

        return response.data;

    }

}