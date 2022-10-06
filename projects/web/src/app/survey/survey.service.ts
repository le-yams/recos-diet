import { Injectable } from '@angular/core';
import {JsonAssetLoaderService} from "../infra/json-asset-loader.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private jsonAssets: JsonAssetLoaderService) { }

  public async get(): Promise<Survey> {
    return await this.jsonAssets.load<Survey>("survey");
  }
}

export interface Survey {
  enabled: boolean
  url: string
}

export const NoSurvey: Survey = {
  enabled: false,
  url: ""
}
