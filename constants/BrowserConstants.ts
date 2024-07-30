class BrowserConstants {
    public readonly FIREFOX: string;
    public readonly WEBKIT: string;

    constructor() {
        this.FIREFOX = "firefox";
        this.WEBKIT = "webkit";
    }

    getFirefox(): string {
        return this.FIREFOX;
    }

    getWebkit(): string {
        return this.WEBKIT;
    }
}

export default BrowserConstants;
