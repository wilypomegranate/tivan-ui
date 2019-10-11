// Module for communication with api.
import urljoin from '../../node_modules/url-join/lib/url-join.js';

const dev = process.env.NODE_ENV === 'development';
let urlRoot = '/api';

if (dev) {
    urlRoot = 'http://localhost:8000';
}

function build_url(...remainder) {
    return urljoin(urlRoot, ...remainder);
}

export default class TivanService {
    async getCameras() {
        const res = await fetch(build_url('/camera/'));
        return await res.json();
    }

    async getCamera(cameraId) {
        const res = await fetch(build_url('/camera/', cameraId, '/'));
        return await res.json();
    }

    async getEvents(start, stop, page = 1, page_size = 10) {
        // let url = new URL('/event/');
        // const params = { start_time: start, stop_time: stop };
        // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const res = await fetch(build_url(`/event/?start_time=${start}&stop_time=${stop}&page=${page}&page_size=${page_size}`));
        return await res.json();
    }

}
