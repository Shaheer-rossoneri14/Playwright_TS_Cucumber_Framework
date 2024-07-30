/**
 * Constants representing different browser types.
 */
class BrowserConstants {
    public readonly FIREFOX: string;
    public readonly WEBKIT: string;

    constructor() {
        this.FIREFOX = "firefox";
        this.WEBKIT = "webkit";
    }

    /**
     * Get the constant for Firefox.
     * 
     * @returns The string "firefox".
     */
    getFirefox(): string {
        return this.FIREFOX;
    }

    /**
     * Get the constant for WebKit.
     * 
     * @returns The string "webkit".
     */
    getWebkit(): string {
        return this.WEBKIT;
    }
}

export default BrowserConstants;
