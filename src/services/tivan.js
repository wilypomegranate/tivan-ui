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
}
