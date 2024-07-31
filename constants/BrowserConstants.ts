/**
 * Constants for browser types.
 */
class BrowserConstants {
    private readonly firefox = 'firefox';
    private readonly webkit = 'webkit';
    private readonly chromium = 'chromium';
    private readonly msedge = 'msedge';

    getFirefox() {
        return this.firefox;
    }

    getWebkit() {
        return this.webkit;
    }

    getChromium() {
        return this.chromium;
    }

    getMsEdge() {
        return this.msedge;
    }
}

export default BrowserConstants;
