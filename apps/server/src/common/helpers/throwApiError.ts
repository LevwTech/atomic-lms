import { API_MESSAGE_TYPE } from './apiMessages';

export class API_ERROR extends Error {
  public code: number;
  constructor(apiMessage: API_MESSAGE_TYPE) {
    super(apiMessage.message);
    this.code = apiMessage.code;
  }
}
