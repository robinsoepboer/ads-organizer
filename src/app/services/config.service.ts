import Config from '../models/config';

export default class ConfigService {

    public config: Config;

    constructor() {
        this.config = require('../../../config.json');
    }
}