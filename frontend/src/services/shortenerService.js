import baseAPI from './api';

class ShortenerService {
  constructor(){
    this.api = baseAPI('http://localhost:3001/');
  };


    async getLink(code) {
      const result = await this.api.get(`links/${code}`);
      
      return result.data;
    }

    async getStats(code) {
      const result = await this.api.get(`links/${code}/stas`);

      return result.stats;
    }

    async generate(model) {      
      const result = await this.api.post('links', model);

      return result.data;
    }
}

export default ShortenerService;