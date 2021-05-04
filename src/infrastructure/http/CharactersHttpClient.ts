import { HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CharactersHttpClient {
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = `${configService.get('infrastructure.api.iceAndFireApi')}/characters`;
    }

    public async listById(id): Promise<any> {
        return await this.httpService.get(`${this.baseUrl}/${id}`).toPromise();
    }
}
