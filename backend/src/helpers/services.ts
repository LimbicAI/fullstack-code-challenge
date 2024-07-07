import { v4 as uuid } from 'uuid';

class Timeout {
    ids = {} as { [key: string|number]: any };

    constructor() {
        this.ids = {};
    }

    setTimeout = (id = uuid(), cb = function(){}, time = 0) => {
        if(this.ids[id]) this.clearTimeout(id);
        this.ids[id] = setTimeout(cb, time);

        return id;
    }

    clearTimeout = (id: string) => {
        if(!id || !this.ids[id]){
            return false;
        }

        clearTimeout(this.ids[id]);
        delete this.ids[id];

        return true;
    }
}

const t = new Timeout();

export default {
    setTimeout: t.setTimeout,
    clearTimeout: t.clearTimeout
};